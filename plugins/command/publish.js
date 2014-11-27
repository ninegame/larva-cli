exports.name = 'publish';
exports.usage = '[dest]';
exports.desc = 'short cmd for release';
exports.register = function (commander) {
  commander
    .option('-d, --dest <names>', 'release output destination', String, 'preview')
    .option('-r, --root <path>', 'set project root')
    .option('-f, --file <filename>', 'set fis-conf file')
    .action(function() {
      var argv = process.argv;
      argv.splice(2, 1, 'release', '-opm');
      fis.cli.run(argv);
    });
};