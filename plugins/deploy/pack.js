var AdmZip = require('adm-zip');

var cwd = process.cwd();

function normalizePath(to, root){
  if (!to){
    to = '/';
  }else if(to[0] === '.'){
    to = fis.util(cwd + '/' +  to);
  } else if(/^output\b/.test(to)){
    to = fis.util(root + '/' +  to);
  }else {
    to = fis.util(to);
  }
  return to;
}

module.exports = function(files, settings, callback){
  if(!fis.util.is(settings, 'Array')){
    settings = [settings];
  }
  var conf = {};
  settings.forEach(function(setting){
    fis.util.merge(conf, setting);
  });
  if (!conf.file){
    fis.log.error('[larva-deploy-pack] need specify the tar file path with option [file]')
  }

  var targetPath = normalizePath(conf.file, fis.project.getProjectPath());
  if(!fis.util.exists(targetPath)){
    fis.util.mkdir(fis.util.pathinfo(targetPath).dirname);
  }
  var zip = new AdmZip();
  files.forEach(function(fileInfo){
    var file = fileInfo.file;
    if(!file.release){
      fis.log.error('unable to get release path of file['
      + file.realpath
      + ']: Maybe this file is neither in current project or releasable');
    }
    //只输出public下的内容
    if(fileInfo.dest.release.indexOf('/public') === 0){
      var name = ((fileInfo.dest.to || '/') + fileInfo.dest.release).replace(/^\/*/g, '').replace(/^\/?public/g, '');
      zip.addFile(name, new Buffer(fileInfo.content));
      fis.log.debug('[larva-deploy-pack] pack file [' + name + ']');
    }
  });

  fis.log.notice('[larva-deploy-pack] pack to: ' + targetPath);
  zip.writeZip(targetPath);
};

module.exports.fullpack = true;