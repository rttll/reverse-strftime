const directives = require('../config/directives');
const log = console.log;

const getDay = (string) => {
  const match = string.match(/[0-9]{1,2}/);
  if (match === null) return null;
  if (string.length > 2 || parseInt(string) > 31) return null;

  const day = match[0];
  const style = day.length > 1 ? '2-digit' : 'numeric';
  return {
    value: day,
    style: style,
  };
};

exports.getDay = getDay;
exports.day = function (options) {
  return new Promise(function (resolve, reject) {
    // log('day.js', options);
    let results = options
      .map((obj) => {
        return getDay(obj.value);
      })
      .filter((r) => r);
    // log('day', results);
    resolve(results);
  });
};
