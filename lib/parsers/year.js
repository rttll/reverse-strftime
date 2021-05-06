const directives = require('../config/directives');

const parse = (string) => {
  const match = string.match(/[0-9]{1,4}/);
  if (match === null || string.length < 2) return null;

  const name = match[0];
  const style = name.length > 2 ? 'numeric' : '2-digit';

  return { name, style };
};

module.exports = function (options) {
  return new Promise(function (resolve, reject) {
    let results = options
      .map((obj) => {
        return parse(obj.value);
      })
      .filter((r) => r);
    // console.log('year', results);
    resolve(results);
  });
};
