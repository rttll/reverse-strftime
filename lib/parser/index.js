const strftime = require('strftime');
const validate = require('./validate');
const getWeekDay = require('./weekday');
const getMonth = require('./month');
const getDay = require('./day');
const getYear = require('./year');
const getDirective = require('./directive');

const log = console.log;

let options,
  str,
  weekday,
  day,
  month,
  year,
  directives = [];

const parser = (inputOptions) => {
  options = inputOptions.date;
  str = options.join(' ');

  const validater = validate(str);
  // log(validater);
  if (!validater.valid) return { error: 'Invalid date' };

  weekday = getWeekDay(str);
  if (weekday) {
    directives.push(getDirective('weekday', weekday.style));
  }

  month = getMonth(str);
  if (month) {
    directives.push(getDirective('month', month.style));
    const regx = new RegExp(`${month.name}${month.punctuation}`);
    str = str.replace(regx, '').trim();
  }

  day = getDay(str, 1);
  if (day) {
    directives.push(getDirective('day', day.style));
    const regx = new RegExp(`${day.name}${day.punctuation}`);
    str = str.replace(regx, '');
  }

  year = getYear(str);
  if (year) {
    directives.push(getDirective('year', year.style));
    const regx = new RegExp(`${year.name}`);
    str = str.replace(regx, '');
  }

  return { directives };
};

module.exports = parser;
