const express = require('express');
const path = require('path');
const { getHtml } = require('./lib/get-html');
const { getConfig } = require('./lib/get-config');

async function createServer(root = process.cwd()) {
  const app = express();

  const relativePath = path.relative(root, __dirname);

  const vite = await require('vite').createServer({
    ...getConfig(root),
    server: {
      middlewareMode: 'ssr',
    },
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      const template = await vite.transformIndexHtml(
        url,
        getHtml(url.startsWith('/preview') ? 'Preview' : 'Main')
      );

      const { render } = await vite.ssrLoadModule(`/server-entry.js`);

      const appHtml = render();

      const html = template.replace('<!--app-html-->', appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).send(e.stack);
    }
  });

  return { app, vite };
}

exports.startDevServer = function startDevServer() {
  createServer().then(({ app }) => {
    app.listen(3000, () => {
      console.log(`server started at port ${3000}`);
    });
  });
};
