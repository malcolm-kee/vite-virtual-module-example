const cli = require('cac')('vite-lib');

cli.command('dev', 'start development server').action(() => {
  const { startDevServer } = require('./scripts/dev');

  startDevServer();
});

cli.command('build', 'build project').action(() => {
  const { build } = require('./scripts/build');

  build();
});

cli.command('[command]').action(() => {
  cli.outputHelp();
});

cli.help();

cli.parse();
