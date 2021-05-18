const directives = require('../config/directives');

module.exports = function (component, style) {
  return '%' + directives[component][style];
};
