module.exports = {
  framework: {
    //cache: true,
    urlPattern: '/c/%s',
    comboPattern: '/co??%s'
  },
  project: {
    exclude: /(node_modules\/.*)|(bower_modules\/.*)|(dist\/.*)/
  },
  modules: {
    deploy: ['default', 'pack']
  },
  roadmap: {
    path: [{
      reg: /\/__[^\/]+$/,
      release: false
    },{
      reg: /.*\.tpl\.html$/,
      release: false
    },{
      reg: /.*\.spec\.js$/,
      release: false
    },{
      reg: /([^\/]+\.inject\.js)$/i,
      release: '/server/inject/$1',
      useHash: false
    },{
      reg: "package.json",
      release: '/public/package.json',
      useHash: false
    }]
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