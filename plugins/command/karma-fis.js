var path = require('path');
var shelljs = require('shelljs');
var crypto = require('crypto');
var logger;

module.exports = function(target){
  target['framework:fis'] = ['factory', fisFramework];
};

function fisFramework(files, config, emitter, loggerFactory){
  logger = loggerFactory.create('framework.fis');

  //wrap file with basePath
  if(config.fis.files) {
    config.fis.files.forEach(function (item) {
      files.push({
        pattern: path.join(config.basePath, item),
        included: true,
        served: true,
        watched: false
      });
    });
  }else{
    logger.warn('config.fis.files is null.')
  }

  //monitor file change
  emitter.on('file_list_modified', function(promise) {
    //compile
    var cmd = config.fis.cmd || (process.cwd()+ '/node_modules/.bin/larva karma -r ./src -d ./dist');
    logger.info(cmd);
    shelljs.exec(cmd);

    //update file sha, so karma can reload news
    promise.then(function(files) {
      files.served.forEach(function(item){
        item.content = require('fs').readFileSync(item.path).toString();
        item.sha = crypto.createHash('sha1').update(item.content).digest('hex');
      });
      return files;
    });
  });
}

fisFramework.$inject = ['config.files', 'config', 'emitter', 'logger'];
