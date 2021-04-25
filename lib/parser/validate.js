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
  // console.log(date);
  let isValid = !isNaN(date);
  if (isValid) return true;

  let weekday = getWeekDay(str);
  if (!weekday) return false;

  // Strip out weekday and try again
  date = new Date(str.replace(weekday, ''));
  isValid = !isNaN(date);
  return isValid;
};
