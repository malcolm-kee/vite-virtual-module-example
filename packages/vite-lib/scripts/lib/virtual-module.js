const virtual = require('@rollup/plugin-virtual');

exports.createVirtualModule = function createVirtualModule() {
  return virtual({
    '/entry.js': `import 'vite-lib/src/client-entry.tsx';`,
    '/server-entry.js': `export * from 'vite-lib/src/server-entry.tsx';`,
  });
};
