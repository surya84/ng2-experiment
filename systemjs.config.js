/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

  // map tells the System loader where to look for things
  var map = {
    'app': 'dist',

    '@angular': 'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs': 'node_modules/rxjs',
    '@vaadin': 'node_modules/@vaadin',
    'moment': 'node_modules/moment',
    'ng2-pagination': 'node_modules/ng2-pagination',
    'underscore': 'node_modules/underscore'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    app: {
      main: 'main.js',
      defaultExtension: 'js'
    },
    'rxjs': { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    '@vaadin/angular2-polymer': { main: 'index.js', defaultExtension: 'js' },
    'moment': { main: 'moment', defaultExtension: 'js' },
    'underscore': { main: 'underscore', defaultExtension: 'js' },
    'ng2-pagination': { main: 'index', defaultExtension: 'js' }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // No umd for router yet
  packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };

  // Forms not on rc yet
  packages['@angular/forms'] = { main: 'index.js', defaultExtension: 'js' };


  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    paths: {
      'app/*': './dist/*'
    },
    map: map,
    packages: packages
  };

  System.config(config);

})(this);
