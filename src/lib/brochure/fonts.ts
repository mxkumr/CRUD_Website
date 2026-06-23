import { Font } from '@react-pdf/renderer';

/** Built-in PDF fonts (Helvetica) — no network fetch required. */
export function registerBrochureFonts() {
  Font.registerHyphenationCallback((word) => [word]);
}
