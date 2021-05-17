const names = require('../config/names');

const log = console.log;

('use strict');

const getNameMatch = (string) => {
  const styles = ['long', 'short'];
  for (const style of styles) {
    const options = names.month.filter((m) => m.style === style);
    let matches = options.filter((m) => string === m.name);
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

exports.month = function (options, sequence) {
  return new Promise(function (resolve, reject) {
    let alphaMatch = options
      .map((obj) => (/[a-z]/.test(obj.value) ? getNameMatch(obj.value) : null))
      .filter((obj) => obj)[0];

    if (alphaMatch) {
      resolve(alphaMatch);
    }

    let numericMatches = options
      .map((obj) =>
        /[0-9]/.test(obj.value) ? getNumericMatch(obj.value) : null
      )
      .filter((obj) => obj);

    if (numericMatches.length === 0) resolve(null);
    if (numericMatches.length === 1) {
      resolve(numericMatches[0]);
    }

    const indexOfType = (array, type) => {
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.type === type) return i;
      }
    };
    let dayIndex = indexOfType(sequence, 'day');
    let monthIndex = indexOfType(sequence, 'month');
    let match = monthIndex < dayIndex ? numericMatches[0] : numericMatches[1];
    resolve(match);
  });
};
