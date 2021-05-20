const directives = require('../config/directives');

module.exports = function (component, style) {
  // TODO: change meridian to `dayPeriod` everywhere
  // Intl. uses dayPeriod
  if (component === 'dayPeriod') component = 'meridian';
  return '%' + directives[component][style];
};
