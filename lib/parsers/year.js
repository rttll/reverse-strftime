const directives = require('../config/directives');

const getYear = (string) => {
  const match = string.match(/[0-9]{1,4}/);
  if (match === null) return null;

  const name = match[0];
  const style = name.length > 2 ? 'numeric' : '2-digit';

  return { name, style };
};

exports.getYear = getYear;

exports.year = function (options, sequence) {
  return new Promise(function (resolve, reject) {
    // If there's a 4-digit year just return that
    let numericYear = options.filter((obj) => /[0-9]{4}/.test(obj.value))[0];
    if (numericYear) {
      resolve({
        name: numericYear.value,
        style: 'numeric',
      });
    }

    let results = options
      .map((obj) => {
        return getYear(obj.value);
      })
      .filter((r) => r);
    if (results.length === 0) resolve(null);

    let hasNumericMonth = false;
    let month = sequence.filter((obj) => obj.type === 'month')[0];
    if (month.value && month.value.style === '2-digit') hasNumericMonth = true;

    let yearIsFirst = sequence[0].type === 'year';
    let index = yearIsFirst ? 0 : 1;
    if (hasNumericMonth) {
      index = 2;
    }

    resolve(results[index] ? results[index] : null);
  });
};
