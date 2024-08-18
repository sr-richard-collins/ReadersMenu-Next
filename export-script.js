const next = require('next');
const fs = require('fs-extra');
const path = require('path');
const http = require('http');

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    handle(req, res);
  });

  const publicPath = path.join(__dirname, 'out');

  fs.emptyDirSync(publicPath);

  server.listen(3000, () => {
    console.log('Server started on http://localhost:3000');

    const pages = ['/', '/about', '/contact']; // Add your routes here

    const requestPage = (page) => {
      return new Promise((resolve, reject) => {
        http
          .get(`http://localhost:3000${page}`, (res) => {
            let data = '';
            res.on('data', (chunk) => {
              data += chunk;
            });
            res.on('end', () => {
              const filePath = path.join(publicPath, page === '/' ? 'index.html' : `${page}.html`);
              fs.ensureFileSync(filePath);
              fs.writeFileSync(filePath, data, 'utf8');
              resolve();
            });
          })
          .on('error', (err) => {
            reject(err);
          });
      });
    };

    Promise.all(pages.map((page) => requestPage(page)))
      .then(() => {
        server.close();
        console.log('Static export complete');
      })
      .catch((err) => {
        console.error('Error during export:', err);
        server.close();
      });
  });
});
