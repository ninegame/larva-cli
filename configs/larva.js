var plugins = {
  define : require('../plugins/postprocessor/define.js'),
  uaeConf : require('../plugins/prepackager/uae-conf.js'),
  frameworkConf : require('../plugins/prepackager/framework-conf.js')
};

module.exports = {
  urlPrefix : '',
  project : {
    fileType : {
      text : 'handlebars, jade, ejs, jsx, styl'
    },
    exclude: /(node_modules\/.*)|(bower_modules\/.*)|(dist\/.*)/
  },
  modules : {
    parser : {
      handlebars : 'handlebars',
      styl       : 'stylus',
      md         : 'marked'
    },
    lint : {
      js: 'jshint'
    },
    postprocessor : {
      js : [ plugins.define ]
    },
    prepackager : [ plugins.uaeConf ],
    postpackager: [ plugins.frameworkConf ]
  },
  framework: {
    //cache: true,
    urlPattern: '/%s',
    comboPattern: '/co??%s'
  },
  modules: {
    deploy: ['default', 'pack']
  },
  roadmap: {
    path: [
      {
        reg: /.*\.tpl\.html$/,
        release: false
      },
      {
        reg: /(.*)\.spec\.js$/,
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
      {
        reg: /^\/component_modules\/.*angular-mocks.*/i,
        release: false
      },
      {
        reg : /^\/component_modules\/([^\/]+)\/[\d\.]+\/(.*)\.(styl|css)$/i,
        id : '${name}/${version}/lib/$1/$2.css',
        isMod : true,
        useSprite : true,
        useHash : false,
        url : '${urlPrefix}/${name}/${version}/lib/$1/$2.$3',
        release : '/public/${name}/${version}/lib/$1/$2.$3'
      },
      {
        reg : /^\/component_modules\/([^\/]+)\/[\d\.]+\/(.*\.js)$/i,
        id : '${name}/${version}/lib/$1/$2',
        isMod : true,
        useHash : false,
        url : '${urlPrefix}/${name}/${version}/lib/$1/$2',
        release : '/public/${name}/${version}/lib/$1/$2'
      },
      {
        reg : /^\/component_modules\/([^\/]+)\/[\d\.]+\/(.*)$/i,
        url : '${urlPrefix}/${name}/${version}/lib/$1/$2',
        release : '/public/${name}/${version}/lib/$1/$2'
      },
      {
        reg : /^\/components\/(.*)\.(styl|css)$/i,
        id : '${name}/${version}/lib/$1.css',
        isMod : true,
        useSprite : true,
        useHash : false,
        url : '${urlPrefix}/${name}/${version}/lib/$1.$2',
        release : '/public/${name}/${version}/lib/$1.$2'
      },
      {
        reg : /^\/components\/(.*\.js)$/i,
        id : '${name}/${version}/lib/$1',
        isMod : true,
        isComponent : true,
        useHash : false,
        url : '${urlPrefix}/${name}/${version}/lib/$1',
        release : '/public/${name}/${version}/lib/$1'
      },
      {
        reg : /^\/components\/(.*)$/i,
        url : '${urlPrefix}/${name}/${version}/lib/$1',
        release : '/public/${name}/${version}/lib/$1'
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
    ]
  },
  uae_conf : {
    config : {
      description: 'UAE 会自动修改这个文件中的配置，请勿手工修改',
      memcached : [
        {
          name : '',
          host : '127.0.0.1',
          port : 11211
        }
      ]
    }
  },
  settings: {
    spriter: {
      csssprites: {
        htmlUseSprite: true,
        styleReg: /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig
      }
    },
    optimizer : {
      "uglify-js" : {
        mangle: {
          except: ["require", "exports", "module", "window"]
        },
        compress: {
          "global_defs": {
            PROD: true
          },
          "dead_code": true,
          "pure_funcs": [
            "console.log",
            //"console.info",
            //"console.warn",
            //"console.error",
            "console.assert",
            "console.count",
            "console.clear",
            "console.group",
            "console.groupEnd",
            "console.groupCollapsed",
            "console.trace",
            "console.debug",
            "console.dir",
            "console.dirxml",
            "console.profile",
            "console.profileEnd",
            "console.time",
            "console.timeEnd",
            "console.timeStamp",
            "console.table",
            "console.exception"
          ]
        }
      }
    },
    deploy: {
      pack: {
        zip: {
          file: './dist/html.zip'
        }
      }
    }
  }
};