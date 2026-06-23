import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToFile } from '@react-pdf/renderer';
import { BrochureDocument } from '../src/lib/brochure/BrochureDocument';

const outDir = path.join(process.cwd(), 'public', 'marketing');
const outFile = path.join(outDir, 'CRUD-Studio-Brochure.pdf');
const logoFile = path.join(process.cwd(), 'public', 'marketing', 'logo-mark.png');

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const logoDataUri = `data:image/png;base64,${fs.readFileSync(logoFile).toString('base64')}`;
  console.log('Generating marketing brochure…');
  await renderToFile(<BrochureDocument logoSrc={logoDataUri} />, outFile);
  console.log(`Done → ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
