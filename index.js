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

console.log('xxxx' + fis.config.get('name'))

fis.config.set('roadmap.path', [
  {
    reg: /.*\.tpl\.html$/,
    release: false
  },
  {
    reg: /.*\.spec\.js$/,
    release: false
  },
  {
    reg: /([^\/]+\.inject\.js)$/i,
    release: '/server/inject/$1',
    useHash: false
  },
  {
    reg : '**.handlebars',
    release : false,
    isJsLike : true
  },
  {
    reg : '**.md',
    release : false,
    isHtmlLike : true
  },
  {
    reg : /\.inline\.\w+$/i,
    release : false
  },
  {
    reg : '**.jade'
  },
  //{
  //  reg : /^\/component_modules\/(.*\.tpl)$/i,
  //  isHtmlLike : true,
  //  release : '/views/c/$1'
  //},
  //{
  //  reg : /^\/components\/(.*\.tpl)$/i,
  //  isHtmlLike : true,
  //  release : '/views/c/${name}/${version}/$1'
  //},
  //{
  //  reg : /^\/views\/(.*\.tpl)$/,
  //  useCache : false,
  //  isViews : true,
  //  isHtmlLike : true,
  //  release : '/views/${name}/${version}/$1'
  //},
  //{
  //  reg : /^\/component_modules\/(.*)\.(styl|css)$/i,
  //  id : '$1.css',
  //  isMod : true,
  //  useSprite : true,
  //  useHash : false,
  //  url : '${urlPrefix}/c/$1.$2',
  //  release : '/public/c/$1.$2'
  //},
  //{
  //  reg : /^\/component_modules\/(.*\.js)$/i,
  //  id : '$1',
  //  isMod : true,
  //  useHash : false,
  //  url : '${urlPrefix}/c/$1',
  //  release : '/public/c/$1'
  //},
  //{
  //  reg : /^\/component_modules\/(.*)$/i,
  //  url : '${urlPrefix}/c/$1',
  //  release : '/public/c/$1'
  //},
  {
    reg : /^\/components\/(.*)\.(styl|css)$/i,
    id : '${name}/${version}/c/$1.css',
    isMod : true,
    useSprite : true,
    useHash : false,
    url : '${urlPrefix}/${name}/${version}/c/$1.$2',
    release : '/public/${name}/${version}/c/$1.$2'
  },
  {
    reg : /^\/components\/(.*\.js)$/i,
    id : '${name}/${version}/c/$1',
    isMod : true,
    isComponent : true,
    useHash : false,
    url : '${urlPrefix}/${name}/${version}/c/$1',
    release : '/public/${name}/${version}/c/$1'
  },
  {
    reg : /^\/components\/(.*)$/i,
    url : '${urlPrefix}/${name}/${version}/c/$1',
    release : '/public/${name}/${version}/c/$1'
  },
  {
    reg : /^\/views\/(.*\.(?:html?|js))$/,
    useCache : false,
    isViews : true,
    url : '${urlPrefix}/${name}/${version}/$1',
    release : '/public/${name}/${version}/$1'
  },
  {
    reg : /^\/views\/(.*)$/,
    useSprite : true,
    isViews : true,
    url : '${urlPrefix}/${name}/${version}/$1',
    release : '/public/${name}/${version}/$1'
  },
  //{
  //  reg : /^\/public\/(.*)$/,
  //  useSprite : true,
  //  url : '${urlPrefix}/${name}/${version}/$1',
  //  release : '/public/${name}/${version}/$1'
  //},
  {
    reg : 'map.json',
    release : false
  },
  {
    reg : '**',
    useHash : false,
    useCompile : false
  }
]);

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

fis.require._cache['command-test'] = {
  name: 'test',
  desc: 'short cmd for release',
  register: function(commander){
    commander
      .action(function() {
        var mainBowerFiles = require('main-bower-files');
        var files = mainBowerFiles(/* options */);
        console.log(files)
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
