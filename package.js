Package.describe({
  name: 'xyz:loading',
  version: '1.1.0',
  summary: 'A spinner that spins while your stuff loads',
  git: 'https://github.com/foxbenjaminfox/meteor-loading',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.export('Loading', 'client')
  api.use([
    'ecmascript',
    'underscore'
  ]);
  api.addFiles([
    '.npm/package/node_modules/spin.js/spin.js',
    'loading.js'
  ], 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('es5-shim');
  api.use('xyz:loading');
  api.addFiles('tests/helpers.js', 'server');
  api.addFiles('tests/test.js', 'client');
});

Npm.depends({
  "spin.js": "2.3.2"
});

