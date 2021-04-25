const directives = require('../directives');

module.exports = function (component, style) {
  return '%' + directives[component][style];
};
