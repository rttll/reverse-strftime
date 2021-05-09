const directives = require('../config/directives');

const getYear = (string) => {
  const match = string.match(/[0-9]{2,4}/);
  if (match === null) return null;

  const name = match[0];
  const style = name.length > 2 ? 'numeric' : '2-digit';

  return { name, style };
};

exports.getYear = getYear;

exports.year = function (options) {
  return new Promise(function (resolve, reject) {
    let results = options
      .map((obj) => {
        return getYear(obj.value);
      })
      .filter((r) => r);
    resolve(results);
  });
};
