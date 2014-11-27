var fis = exports.fis = require('fis');
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');
fis.cli.name = 'larva';

fis.require.prefixes = [ fis.cli.name, 'scrat', 'fis' ];
fis.cli.version = require('./version.js');
fis.cli.help.commands = [ 'release', 'install', 'server', 'init' ];

var larvaConfig = require('./configs/larva.js');
fis.config.merge(larvaConfig);

//register command plugins
['publish', 'karma'].forEach(function(name){
  fis.require._cache['command-' + name] = require('./plugins/command/' + name);
});

require('./plugins/command/karma-fis')(exports);

//register deploy plugins
['pack', 'apk'].forEach(function(name){
  fis.require._cache['deploy-' + name] = require('./plugins/deploy/' + name);
});

//alias
Object.defineProperty(global, fis.cli.name, {
  enumerable : true,
  writable : false,
  value : fis
});
