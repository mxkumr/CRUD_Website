/**
 * Local production server (npm start).
 * cPanel: use the server.js inside the deployment zip (Next.js standalone).
 */
const { spawn } = require('child_process');
const path = require('path');

const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');

if (require('fs').existsSync(standaloneServer)) {
  require(standaloneServer);
} else {
  // Fallback before standalone build exists
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
}
