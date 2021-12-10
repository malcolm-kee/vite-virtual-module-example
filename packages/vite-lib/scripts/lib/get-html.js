exports.getHtml = function getHtml(title = 'Vite App') {
  return `<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    </head>
    <body>
    <div id="app"><!--app-html--></div>
    <script type="module" src="/entry.js"></script>
    </body>
</html>`;
};
