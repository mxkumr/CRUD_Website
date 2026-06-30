import fs from 'node:fs';
import path from 'node:path';
import { spawn, type ChildProcess } from 'node:child_process';
import { PDFDocument } from 'pdf-lib';
import puppeteer, { type Browser, type Page } from 'puppeteer';

const BASE_URL = process.env.PDF_BASE_URL ?? 'http://localhost:9002';
const VIEWPORT_WIDTH = 1440;
const OUT_DIR = path.join(process.cwd(), 'public', 'marketing');
const TMP_DIR = path.join(OUT_DIR, '.tmp');

const MARKETING_PAGES = [
  { path: '/', file: 'home.pdf', label: 'Home' },
  { path: '/work', file: 'work.pdf', label: 'Work' },
  { path: '/capabilities', file: 'capabilities.pdf', label: 'Capabilities' },
  { path: '/studio', file: 'studio.pdf', label: 'Studio' },
  { path: '/contact', file: 'contact.pdf', label: 'Contact' },
] as const;

const PRINT_CSS = `
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
  }
  html { scroll-behavior: auto !important; }
  .pointer-events-none.fixed { display: none !important; }
`;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function isServerUp(url: string) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    return res.ok;
  } catch {
    return false;
  }
}

async function ensureServer(): Promise<ChildProcess | null> {
  if (await isServerUp(BASE_URL)) {
    console.log(`Using running server at ${BASE_URL}`);
    return null;
  }

  console.log('Starting dev server…');
  const child = spawn('npm', ['run', 'dev'], {
    cwd: process.cwd(),
    shell: true,
    stdio: 'ignore',
    detached: process.platform !== 'win32',
  });

  for (let i = 0; i < 90; i++) {
    await sleep(1000);
    if (await isServerUp(BASE_URL)) {
      console.log('Dev server ready.');
      return child;
    }
  }

  child.kill();
  throw new Error(`Could not reach ${BASE_URL} - start the dev server and retry.`);
}

async function preparePage(page: Page, theme: 'light' | 'dark') {
  await page.setViewport({ width: VIEWPORT_WIDTH, height: 900, deviceScaleFactor: 2 });
  await page.emulateMediaType('screen');

  if (theme === 'light') {
    await page.evaluateOnNewDocument(`
      localStorage.setItem('crud-theme', 'light');
      document.documentElement.classList.add('theme-light');
    `);
  }
}

async function settlePage(page: Page) {
  await page.addStyleTag({ content: PRINT_CSS });
  await page.evaluate(`document.fonts.ready`);
  await sleep(800);

  // String body avoids tsx injecting __name into page.evaluate callbacks
  await page.evaluate(`
    new Promise((resolve) => {
      const delay = 120;
      const step = Math.max(300, Math.floor(window.innerHeight * 0.7));
      let y = 0;
      const max = document.documentElement.scrollHeight;
      const tick = () => {
        window.scrollTo(0, y);
        y += step;
        if (y < max) {
          setTimeout(tick, delay);
        } else {
          window.scrollTo(0, max);
          setTimeout(() => {
            window.scrollTo(0, 0);
            setTimeout(resolve, 300);
          }, 400);
        }
      };
      tick();
    })
  `);

  await page.evaluate(`
    document.querySelectorAll('[aria-hidden].fixed').forEach((el) => {
      el.style.display = 'none';
    });
  `);
}

async function captureRoute(page: Page, route: string, outFile: string) {
  const url = `${BASE_URL}${route}`;
  console.log(`  Capturing ${url}`);

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 120_000 });
  await settlePage(page);

  const { width, height } = await page.evaluate(`
    ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    })
  `) as { width: number; height: number };

  await page.pdf({
    path: outFile,
    printBackground: true,
    width: `${width}px`,
    height: `${Math.max(height, 900)}px`,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: false,
  });
}

async function mergePdfs(inputs: string[], output: string) {
  const merged = await PDFDocument.create();
  for (const file of inputs) {
    const bytes = fs.readFileSync(file);
    const doc = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    pages.forEach((p) => merged.addPage(p));
  }
  fs.writeFileSync(output, await merged.save());
}

async function run() {
  const all = process.argv.includes('--all');
  const theme = process.argv.includes('--light') ? 'light' : 'dark';

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(TMP_DIR, { recursive: true });

  const server = await ensureServer();
  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
    });

    const page = await browser.newPage();
    await preparePage(page, theme);

    const routes = all ? MARKETING_PAGES : [MARKETING_PAGES[0]];
    const tmpFiles: string[] = [];

    for (const route of routes) {
      const tmp = path.join(TMP_DIR, route.file);
      await captureRoute(page, route.path, tmp);
      tmpFiles.push(tmp);
    }

    const outName = all ? 'CRUD-Studio-Website-Full.pdf' : 'CRUD-Studio-Website.pdf';
    const outFile = path.join(OUT_DIR, outName);

    if (tmpFiles.length === 1) {
      fs.copyFileSync(tmpFiles[0], outFile);
    } else {
      await mergePdfs(tmpFiles, outFile);
    }

    console.log(`Done → ${outFile}`);
    if (!all) {
      console.log('Tip: run with --all to include Work, Capabilities, Studio & Contact pages.');
    }
  } finally {
    if (browser) await browser.close();
    if (server) {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', String(server.pid), '/f', '/t'], { shell: true });
      } else {
        process.kill(-server.pid!, 'SIGTERM');
      }
    }
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
