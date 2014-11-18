exports.name = 'publish';
exports.usage = '[dest]';
exports.desc = 'short cmd for release';
exports.register = function (commander) {
  commander
    .option('-d, --dest <names>', 'release output destination', String, 'preview')
    .action(function() {
      var argv = process.argv;
      argv.splice(2, 1, 'release', '-opm');
      fis.cli.run(argv);
    });
};