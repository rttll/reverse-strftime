const directives = require('../config/directives');

function getMeridian(str) {
  let style = str.includes('m') ? 'lower' : str.includes('M') ? 'caps' : null;
  let directive = '%' + directives.meridian[style];
  return { directive, style };
}

exports.getMeridian = getMeridian;
exports.meridian = function (options) {
  let matches = options[options.length - 1].value.match(/am|pm|AM|PM/);
  if (!matches) return null;
  return getMeridian(matches[0]);
};
