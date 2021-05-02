const directives = require('../config/directives');
module.exports = function (options) {
  let match = options[options.length - 1].match(/am|pm|AM|PM/);
  if (!match) return null;
  let style = match[0].includes('m')
    ? 'lower'
    : match[0].includes('M')
    ? 'caps'
    : null;
  let directive = '%' + directives.meridian[style];
  return { directive, style };
};
