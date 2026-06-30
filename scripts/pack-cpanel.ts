/**
 * Build a cPanel-ready deployment zip from the Next.js standalone output.
 *
 * Usage: npm run pack:cpanel
 * Output: crud-studio-cpanel.zip (project root)
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const STAGING = path.join(ROOT, '.deploy-staging');
const OUT_ZIP = path.join(ROOT, 'crud-studio-cpanel.zip');

const DEPLOY_README = `CRUD Studio — cPanel deployment
================================

BEFORE UPLOAD
-------------
1. In cPanel File Manager, BACK UP your current public_html folder.
2. DELETE old WordPress files from public_html (wp-admin, wp-content, index.php, etc.).
   The main site must NOT be WordPress — this is a Node.js Next.js app.

UPLOAD
------
1. Upload crud-studio-cpanel.zip to your home directory (not public_html yet).
2. Extract the zip.
3. Move ALL extracted files into public_html:
     server.js
     package.json
     node_modules/
     .next/
     public/
     .env.example

NODE.JS APP (cPanel → Setup Node.js App)
----------------------------------------
  Node version:     20.x
  Application mode: Production
  Application root: public_html
  Application URL:  thecrudstudio.com
  Startup file:     server.js

4. Click "Run NPM Install" (usually not needed — node_modules included).
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
  If blank: check Node.js app is Running and startup file is server.js.

Built: ${new Date().toISOString()}
`;

function rmrf(dir: string) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function copyDir(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
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
          else fs.copyFileSync(ff, path.join(to, f));
        }
      } else {
        copyDir(from, to);
      }
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

function main() {
  console.log('Building production bundle…');
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
  const isWin = process.platform === 'win32';
  if (isWin) {
    const stagingWin = STAGING.replace(/\//g, '\\');
    const zipWin = OUT_ZIP.replace(/\//g, '\\');
    execSync(
      `powershell -NoProfile -Command "Compress-Archive -Path '${stagingWin}\\*' -DestinationPath '${zipWin}' -Force"`,
      { stdio: 'inherit' },
    );
  } else {
    execSync(`cd "${STAGING}" && zip -r "${OUT_ZIP}" .`, { stdio: 'inherit' });
  }

  rmrf(STAGING);

  const sizeMb = (fs.statSync(OUT_ZIP).size / (1024 * 1024)).toFixed(1);
  console.log(`\nDone → ${OUT_ZIP} (${sizeMb} MB)`);
  console.log('Upload to cPanel, extract into public_html, configure Node.js app (see DEPLOY.txt).');
}

main();
