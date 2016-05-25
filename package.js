Package.describe({
  name: 'xyz:loading',
  version: '1.2.0',
  summary: 'A spinner that spins while your stuff loads',
  git: 'https://github.com/foxbenjaminfox/meteor-loading',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use([
    'ecmascript',
    'underscore'
  ]);
  api.mainModule('loading.js', 'client');
  api.export('Loading', 'client')
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

