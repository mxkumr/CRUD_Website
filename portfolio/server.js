/**
 * Custom server entry point for cPanel "Setup Node.js App" (Phusion Passenger).
 * Passenger sets PORT itself; locally you can run `node server.js` on 3000.
 */
const { createServer } = require('http');
const next = require('next');

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`> Ready on port ${port}`);
  });
});
