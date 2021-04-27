/**
 *
 * @param {*} str Date Sring
 * @returns Boolean
 *
 * Make sure we have a valid date to work with
 * e.g. Saturday Jun 1, 1/2020, September 6 44
 *
 */

const getWeekDay = require('./weekday');
module.exports = function (str) {
  let date = new Date(str);
  let valid = !isNaN(date);
  if (valid)
    return {
      valid: valid,
      date: date,
    };

  let weekday = getWeekDay(str);
  if (!weekday) return { valid: false };

  // Strip out weekday and try again
  date = new Date(str.replace(weekday, ''));
  valid = !isNaN(date);
  return {
    valid: valid,
    date: date,
  };
};
