var loremIpsum = require('lorem-ipsum');

module.exports = function (count, options) {
  options = options || {};
  if (typeof count === 'number') {
    options.count = count;
  } else {
    options = count || {};
  }
  options.units = options.units || 'words';
  return loremIpsum(options);
};
