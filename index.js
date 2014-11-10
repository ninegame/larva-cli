var fis = module.exports = require('fis');
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');
fis.cli.name = 'larva';

fis.require.prefixes = [ fis.cli.name, 'scrat', 'fis' ];
fis.cli.version = require('./version.js');
fis.cli.help.commands = [ 'release', 'install', 'server', 'init' ];

var defaultConfig = require('./configs/default.js');
fis.config.merge(defaultConfig);

var larvaConfig = require('./configs/larva.js');
fis.config.merge(larvaConfig);

fis.require._cache['command-publish'] = {
  name: 'publish',
  desc: 'short cmd for release',
  register: function(commander){
    commander
      .option('-d, --dest <names>', 'release output destination', String, 'preview')
      .action(function() {
        var argv = process.argv;
        argv.splice(2, 1, 'release', '-opm');
        fis.cli.run(argv);
      });
  }
};

['pack', 'apk'].forEach(function(name){
  fis.require._cache['deploy-' + name] = require('./plugins/deploy/' + name);
});

//alias
Object.defineProperty(global, fis.cli.name, {
  enumerable : true,
  writable : false,
  value : fis
});
