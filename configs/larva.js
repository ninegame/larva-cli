module.exports = {
  framework: {
    //cache: true,
    urlPattern: '/%s',
    comboPattern: '/co??%s'
  },
  project: {
    exclude: /(node_modules\/.*)|(bower_modules\/.*)|(dist\/.*)/
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
      {
        reg : /^\/component_modules\/(.*\.tpl)$/i,
        isHtmlLike : true,
        release : '/views/c/$1'
      },
      {
        reg : /^\/components\/(.*\.tpl)$/i,
        isHtmlLike : true,
        release : '/views/c/${name}/${version}/$1'
      },
      {
        reg : /^\/views\/(.*\.tpl)$/,
        useCache : false,
        isViews : true,
        isHtmlLike : true,
        release : '/views/${name}/${version}/$1'
      },
      {
        reg : /^\/component_modules\/(.*)\.(styl|css)$/i,
        id : '$1.css',
        isMod : true,
        useSprite : true,
        useHash : false,
        url : '${urlPrefix}/c/$1.$2',
        release : '/public/c/$1.$2'
      },
      {
        reg : /^\/component_modules\/(.*\.js)$/i,
        id : '$1',
        isMod : true,
        useHash : false,
        url : '${urlPrefix}/c/$1',
        release : '/public/c/$1'
      },
      {
        reg : /^\/component_modules\/(.*)$/i,
        url : '${urlPrefix}/c/$1',
        release : '/public/c/$1'
      },
      {
        reg : /^\/components\/(.*)\.(styl|css)$/i,
        id : '${name}/${version}/$1.css',
        isMod : true,
        useSprite : true,
        useHash : false,
        url : '${urlPrefix}/c/${name}/${version}/$1.$2',
        release : '/public/c/${name}/${version}/$1.$2'
      },
      {
        reg : /^\/components\/(.*\.js)$/i,
        id : '${name}/${version}/$1',
        isMod : true,
        isComponent : true,
        useHash : false,
        url : '${urlPrefix}/c/${name}/${version}/$1',
        release : '/public/c/${name}/${version}/$1'
      },
      {
        reg : /^\/components\/(.*)$/i,
        url : '${urlPrefix}/c/${name}/${version}/$1',
        release : '/public/c/${name}/${version}/$1'
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
      {
        reg : /^\/public\/(.*)$/,
        useSprite : true,
        url : '${urlPrefix}/${name}/${version}/$1',
        release : '/public/${name}/${version}/$1'
      },
      {
        reg : 'map.json',
        release : false
      },
      {
        reg : '**',
        useHash : false,
        useCompile : false
      }
    //  {
    //  reg: "package.json",
    //  release: '/public/package.json',
    //  useHash: false
    //}
    ]
  },
  settings: {
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