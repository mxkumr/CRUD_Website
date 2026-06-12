# CRUD Studio

Marketing website for CRUD (Create Refine Unified Designs) — a design studio crafting brands, websites, and digital products.

Built with Next.js 15, Tailwind CSS, Framer Motion, and Lenis smooth scrolling.

## Development

```bash
npm install
npm run dev
```

The site runs at http://localhost:9002.

## Production

```bash
npm run build
npm start
```

For cPanel hosting (Phusion Passenger), use `server.js` as the application startup file — it reads the port from `process.env.PORT`.
