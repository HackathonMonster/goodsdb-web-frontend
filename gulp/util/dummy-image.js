var _          = require('lodash');
var dummyImage = require('dummy-image');
var path       = require('path');
var fs         = require('fs-extra');


generatedImages = [];

module.exports = function (options) {
  if(_.isNumber(options) || _.isString(options)) {
    var width = arguments[0];
    var height = arguments[1];
    var type = arguments[2];
    var replace = arguments[3];
    height = height || width;
    options = {width: width, height: height, type: type, replace: replace};
  }

  if (options.replace) {
    return options.replace;
  }

  var generated = _.find(generatedImages, options);
  if (generated) {
    return generated.path;
  }

  var generatedOptions = _.clone(options);
  generatedImages.push(generatedOptions);

  var baseDir = path.join(__dirname, '../../dist');
  options.outputDir = path.join(baseDir, 'images', 'dummy');
  if (!fs.existsSync(options.outputDir)) {
    fs.mkdirSync(options.outputDir);
  }
  var imgPath = dummyImage(options);
  generatedOptions.path = path.relative(baseDir, imgPath);
  return generatedOptions.path;
};
