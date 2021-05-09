('use strict');

const names = require('../config/names');
const log = console.log;

let input;

/**
 *
 * @param {String} option
 * @returns {Object} match
 *
 */

const getWeekday = (option) => {
  // log('weekday', option);
  const styles = ['long', 'short'];
  for (const style of styles) {
    const options = names.weekday.filter((m) => m.style === style);
    let matches = options.filter((m) => option.includes(m.name));
    if (matches.length > 0) {
      return matches[0];
    }
  }
  return null;
};

exports.getWeekday = getWeekday;

/**
 *
 * @param {Array} options Array of objects
 * @returns
 */

exports.weekday = function (options) {
  input = options;
  let type = 'alpha';
  return new Promise(function (resolve, reject) {
    let results = options.map((obj) => {
      if (obj.type !== type) return null;
      return getWeekday(obj.value);
    });
    resolve(results.filter((r) => r));
  });
};
