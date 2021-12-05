const express = require('express');
const path = require('path');
const virtual = require('@rollup/plugin-virtual');

async function createServer(root = process.cwd()) {
  const app = express();

  const relativePath = path.relative(root, __dirname);

  const vite = await require('vite').createServer({
    root,
    logLevel: 'info',
    server: {
      middlewareMode: 'ssr',
    },
    configFile: false,
    plugins: [
      require('@vitejs/plugin-react').default(),
      virtual({
        '/entry.js': `import 'vite-lib/src/client-entry.tsx';`,
        '/server-entry.js': `export * from 'vite-lib/src/server-entry.tsx';`,
      }),
    ],
    build: {
      minify: false,
    },
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      const template = await vite.transformIndexHtml(
        url,
        `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"><!--app-html--></div>
    <script type="module" src="/entry.js"></script>
  </body>
</html>`
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

createServer().then(({ app }) => {
  app.listen(3000, () => {
    console.log('server started');
  });
});
