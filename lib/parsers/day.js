const { whiteBright } = require('chalk');

const log = console.log;

const getDay = (string) => {
  const match = string.match(/[0-9]{1,2}/);
  if (match === null) return null;
  if (string.length > 2 || parseInt(string) > 31) return null;

  const day = match[0];
  const style = day.length > 1 ? '2-digit' : 'numeric';
  return {
    name: day,
    style: style,
  };
};

exports.getDay = getDay;
exports.day = function (options, sequence) {
  // log('seq at day', sequence);
  return new Promise(function (resolve, reject) {
    let results = options
      .map((obj) => {
        return getDay(obj.value);
      })
      .filter((r) => r);

    if (results.length === 0) resolve(null);

    const indexOfType = (array, type) => {
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.type === type) return i;
      }
    };

    let dayIndex = indexOfType(sequence, 'day'),
      monthIndex = indexOfType(sequence, 'month');
    let monthIsFirst = monthIndex < dayIndex;
    // prettier-ignore
    let monthExists = false;
    let month = sequence.filter((obj) => obj.type === 'month')[0];
    if (month.value && month.value.style === '2-digit') monthExists = true;
    // log(results.length);
    // log(month);
    // log(monthIsFirst, monthExists, results);
    if (monthIsFirst && monthExists) {
      resolve(results[1]);
    }
    // log('hi');
    resolve(results[0]);
  });
};
