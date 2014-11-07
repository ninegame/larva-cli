var fis = module.exports = require('fis');
var pkg = fis.cli.info = fis.util.readJSON(__dirname + '/package.json');
fis.require.prefixes = [ pkg.name, 'scrat', 'fis' ];
fis.cli.name = pkg.name;
fis.cli.version = require('./version.js');
fis.cli.help.commands = [ 'release', 'install', 'server', 'init' ];

var defaultConfig = require('./configs/default.js');
fis.config.merge(defaultConfig);

var larvaConfig = require('./configs/larva.js');
fis.config.merge(larvaConfig);

//alias
Object.defineProperty(global, pkg.name, {
  enumerable : true,
  writable : false,
  value : fis
});
