/**
 * Build a cPanel-ready deployment zip from the Next.js standalone output.
 *
 * Usage: npm run pack:cpanel
 * Output: crud-studio-cpanel.zip (project root)
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import archiver from 'archiver';

const ROOT = process.cwd();
const STAGING = path.join(ROOT, '.deploy-staging');
const OUT_ZIP = path.join(ROOT, 'crud-studio-cpanel.zip');

const DEPLOY_README = `CRUD Studio — cPanel / CloudLinux deployment
==============================================

IMPORTANT (CloudLinux NodeJS Selector)
--------------------------------------
- Do NOT use "public_html" as the application root — cPanel will reject it.
- Do NOT upload or keep a "node_modules" folder in the app root — CloudLinux
  creates its own virtual env and a node_modules symlink. Delete it if present.

BEFORE UPLOAD
-------------
1. Back up your current site in File Manager.
2. Remove old WordPress files from public_html if replacing that site.

UPLOAD
------
1. In File Manager, create folder: crud-studio  (in your home dir, NOT public_html)
2. Upload crud-studio-cpanel.zip there and Extract.
3. Confirm these files are directly inside crud-studio/:
     server.js
     package.json
     .next/
     public/
     .env.example
   There must be NO node_modules/ folder.

NODE.JS APP (cPanel → Setup Node.js App)
----------------------------------------
  Node version:     20.20.2  (or closest 20.x available)
  Application mode: Production
  Application root: crud-studio
  Application URL:  thecrudstudio.com
  Startup file:     server.js

4. Click "Run NPM Install" — required; CloudLinux installs deps into its virtual env.
5. Add environment variables (see .env.example) for the contact form SMTP.
6. Click RESTART.

ENV VARS (contact form)
-----------------------
  SMTP_HOST=mail.thecrudstudio.com
  SMTP_PORT=587
  SMTP_SECURE=false
  SMTP_USER=hello@thecrudstudio.com
  SMTP_PASS=your-mailbox-password
  SMTP_FROM="CRUD Studio <hello@thecrudstudio.com>"
  CONTACT_TO=thecrudstudio@gmail.com

VERIFY
------
  https://thecrudstudio.com should load the full CRUD Studio site.
  If blank: check Node.js app is Running, startup file is server.js, and NPM Install completed.

FAVICON / GOOGLE LOGO
---------------------
  After upload, ALSO delete any old favicon.ico sitting in public_html
  (Apache can serve that instead of the Node app icon — that was the
  Firebase Studio logo). Confirm these show the black CRUD circle:
    https://thecrudstudio.com/favicon.ico?v=3
    https://thecrudstudio.com/icon-48.png?v=3
  Google Search can keep the old icon for days. In Search Console →
  URL Inspection → request indexing on the homepage to speed it up.

Built: ${new Date().toISOString()}
`;

function rmrf(dir: string) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function copyFile(src: string, dest: string) {
  // Read/write avoids Windows file-share locks from copyFileSync during dev-server runs.
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, fs.readFileSync(src));
}

function copyDir(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else {
      copyFile(from, to);
    }
  }
}

/** Copy public/ but skip large marketing PDFs (regenerate locally if needed). */
function copyPublic(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'marketing') {
        fs.mkdirSync(to, { recursive: true });
        for (const f of fs.readdirSync(from)) {
          if (f.endsWith('.pdf')) continue;
          const ff = path.join(from, f);
          if (fs.statSync(ff).isDirectory()) copyDir(ff, path.join(to, f));
          else copyFile(ff, path.join(to, f));
        }
      } else {
        copyDir(from, to);
      }
    } else {
      copyFile(from, to);
    }
  }
}

async function createZip(sourceDir: string, outPath: string, attempts = 3): Promise<void> {
  for (let i = 1; i <= attempts; i++) {
    try {
      await new Promise<void>((resolve, reject) => {
        const output = fs.createWriteStream(outPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => resolve());
        output.on('error', reject);
        archive.on('error', reject);
        archive.pipe(output);
        archive.directory(sourceDir, false);
        void archive.finalize();
      });
      return;
    } catch (err) {
      if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
      if (i === attempts) throw err;
      console.warn(`Zip attempt ${i} failed, retrying…`);
      await new Promise((r) => setTimeout(r, 800));
    }
  }
}

async function main() {
  console.log('Building production bundle…');
  console.log('Tip: stop "npm run dev" first if zip creation fails on Windows.\n');
  execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });

  const standalone = path.join(ROOT, '.next', 'standalone');
  const staticDir = path.join(ROOT, '.next', 'static');
  const publicDir = path.join(ROOT, 'public');

  if (!fs.existsSync(standalone)) {
    throw new Error('Missing .next/standalone — ensure next.config.js has output: "standalone"');
  }

  console.log('Staging deployment files…');
  rmrf(STAGING);
  fs.mkdirSync(STAGING, { recursive: true });

  copyDir(standalone, STAGING);
  copyDir(staticDir, path.join(STAGING, '.next', 'static'));
  copyPublic(publicDir, path.join(STAGING, 'public'));

  // CloudLinux NodeJS Selector rejects apps with a real node_modules folder —
  // it creates its own virtual env and symlinks node_modules. Run NPM Install on cPanel.
  rmrf(path.join(STAGING, 'node_modules'));

  fs.writeFileSync(path.join(STAGING, 'DEPLOY.txt'), DEPLOY_README);
  fs.copyFileSync(path.join(ROOT, '.env.example'), path.join(STAGING, '.env.example'));

  // Trim standalone package.json to production start script only
  const pkgPath = path.join(STAGING, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as Record<string, unknown>;
  pkg.scripts = { start: 'node server.js' };
  delete pkg.devDependencies;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

  if (fs.existsSync(OUT_ZIP)) fs.unlinkSync(OUT_ZIP);

  console.log('Creating zip…');
  await createZip(STAGING, OUT_ZIP);

  rmrf(STAGING);

  if (!fs.existsSync(OUT_ZIP)) {
    throw new Error(`Zip was not created: ${OUT_ZIP}`);
  }

  const sizeMb = (fs.statSync(OUT_ZIP).size / (1024 * 1024)).toFixed(1);
  console.log(`\nDone → ${OUT_ZIP} (${sizeMb} MB)`);
  console.log('Upload to cPanel → extract into crud-studio/ → Setup Node.js App → Run NPM Install (see DEPLOY.txt).');
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
