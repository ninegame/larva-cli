var fis = module.exports = require('fis');
var pkg = fis.cli.info = fis.util.readJSON(__dirname + '/package.json');
fis.cli.name = 'larva';

fis.require.prefixes = [ fis.cli.name, 'scrat', 'fis' ];
fis.cli.version = require('./version.js');
fis.cli.help.commands = [ 'release', 'install', 'server', 'init' ];

var defaultConfig = require('./configs/default.js');
fis.config.merge(defaultConfig);

var larvaConfig = require('./configs/larva.js');
fis.config.merge(larvaConfig);

//alias
Object.defineProperty(global, fis.cli.name, {
  enumerable : true,
  writable : false,
  value : fis
});
