const names = require('../config/names');

const log = console.log;

('use strict');

const getNameMatch = (string) => {
  const styles = ['long', 'short']; // long must be first
  for (const style of styles) {
    const options = names.month.filter((m) => m.style === style);
    let matches = options.filter((m) => string.includes(m.name));
    if (matches.length > 0) {
      var match = matches[0];
      break;
    }
  }
  return match;
};

const getNumericMatch = (string) => {
  if (string.length > 2) return null;
  const matches = string.match(/[0-9]{1,2}/);
  if (matches === null) return null;

  const name = matches[0];

  let warn = name.length < 2 ? 'has no single-digit directive' : null;

  return {
    style: '2-digit',
    name,
    warn,
  };
};

exports.getNumericMatch = getNumericMatch;
exports.getNameMatch = getNameMatch;

/**
 *
 * @param {*} options
 * @returns Array of
 */
exports.month = function (options) {
  return new Promise(function (resolve, reject) {
    results = options
      .map((obj) => {
        let match = /[0-9]/.test(obj.value)
          ? getNumericMatch(obj.value)
          : getNameMatch(obj.value);
        return match;
      })
      .filter((r) => r);
    resolve(results);
  });
};
