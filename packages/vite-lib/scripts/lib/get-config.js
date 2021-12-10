const { createVirtualModule } = require('./virtual-module');

exports.getConfig = function getConfig(root) {
  return {
    root,
    logLevel: 'info',
    configFile: false,
    plugins: [require('@vitejs/plugin-react').default(), createVirtualModule()],
    build: {
      minify: false,
    },
  };
};
