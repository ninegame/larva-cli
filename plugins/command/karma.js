var rimraf = require('rimraf');

exports.name = 'karma';
exports.usage = '[dest]';
exports.desc = 'create release for karma';
exports.register = function (commander) {
  commander
    .option('-d, --dest <names>', 'release output destination', String, './dist')
    .option('-r, --root <path>', 'set project root')
    .option('-p, --pack', 'with package', Boolean, true)
    .option('-w, --watch', 'monitor the changes of project')
    .option('-c, --clean', 'clean compile cache', Boolean, false)
    .option('-m, --md5 [level]', 'md5 release option', Number)
    .option('-f, --file <filename>', 'set fis-conf file')
    .option('-c, --clean', 'clean install cache', Boolean)
    .action(function(){
      var argv = process.argv;
      var dest = commander.dest;
      karma();
      if(commander.clean){
        rimraf.sync(dest);
      }
      argv.splice(2, 1, 'release', '-d', dest);
      fis.cli.run(argv);
    });
};

function karma(){
  //fis.config.set('urlPrefix', 'base');
  fis.config.set('framework/urlPattern', '/base/%s');
  fis.config.get('roadmap.path').unshift(
    //{
    //  reg: /karma\.conf\.js/,
    //  useHash : false,
    //  release: '/public/$&'
    //},
    //{
    //  reg: /\.(jpe?g|png|gif)$/i,
    //  useHash : false,
    //  release: false
    //},
    {
      reg: /\/lib\/scrat\/scrat\.js/,
      useHash : false,
      release: '/public/scrat.js'
    },
    {
      reg: /^\/test\/test-main\.js$/,
      isViews: true,
      useHash : false,
      release: '/public/$&'
    },
    {
      reg: /\/(.*\.spec\.js)$/,
      id : '$1',
      isJsLike: true,
      isMod : true,
      useHash : false,
      release: '/public/$1'
    },
    {
      reg: /^\/component_modules\/(.*angular-mocks.*)\/[\d\.]+\/(.*)/i,
      id: '${name}/${version}/lib/$1/$2',
      isMod: true,
      useHash: false,
      url: '${urlPrefix}/${name}/${version}/lib/$1/$2',
      release: '/public/${name}/${version}/lib/$1/$2'
    }
  );
}