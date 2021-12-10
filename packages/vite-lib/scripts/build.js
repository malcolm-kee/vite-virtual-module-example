const vite = require('vite');
const fs = require('fs').promises;
const path = require('path');
const { getConfig } = require('./lib/get-config');
const { getHtml } = require('./lib/get-html');

async function buildClient(root) {
  await fs.writeFile(
    path.resolve(root, 'index.html'),
    getHtml('Home'),
    'utf-8'
  );
  await fs.writeFile(
    path.resolve(root, 'preview.html'),
    getHtml('Preview'),
    'utf-8'
  );

  await vite.build({
    ...getConfig(root),
    build: {
      outDir: './dist',
      rollupOptions: {
        input: {
          main: path.resolve(root, 'index.html'),
          preview: path.resolve(root, 'preview.html'),
        },
      },
    },
  });

  await fs.unlink(path.resolve(root, 'index.html'));
}

async function buildBundle(root) {
  await vite.build({
    ...getConfig(root),
    build: {
      minify: false,
      outDir: './dist/server',
      ssr: true,
      rollupOptions: {
        input: ['/server-entry.js'],
      },
    },
  });
}

exports.build = async function build(root = process.cwd()) {
  await buildClient(root);

  await buildBundle(root);

  const { render } = require(`${root}/dist/server/server-entry.js`);

  const plainHtml = await fs.readFile(
    path.resolve(root, 'dist/index.html'),
    'utf-8'
  );

  const finalHtml = plainHtml.replace('<!--app-html-->', render());

  await fs.writeFile(path.resolve(root, 'dist/index.html'), finalHtml, 'utf-8');
};
