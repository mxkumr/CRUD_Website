import { GeistSans } from 'geist/font/sans'

/**
 * Root shell for every page. Imported from `pages/_app.jsx`.
 * Global styles are imported in `pages/_app.jsx` (Next.js requirement).
 * Add providers, document-level layout, or global side effects here.
 */
export default function App({ children }) {
  return <div className={GeistSans.className}>{children}</div>
}
