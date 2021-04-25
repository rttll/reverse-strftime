const strftime = require('strftime');
const codes = require('../codes');
const validate = require('./validate');
const getWeekDay = require('./weekday');
const getMonth = require('./month');
const getStyle = require('./style');

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

  const valid = validate(str);
  if (!valid) return { error: 'Invalid date' };

  weekday = getWeekDay(str);
  if (weekday) {
    let directive = codes.weekday[weekday.style];
    directives.push('%' + directive);
  }

  month = getMonth(str);
  if (month) {
    let directive = codes.month[month.style];
    directives.push('%' + directive);
  }

  const dayProp = weekday ? options[2] : options[1];
  if (dayProp) day = getStyle(dayProp, 1);
  if (day) {
    let directive = codes.day[day];
    directives.push('%' + directive);
  }

  const yearProp = weekday ? options[3] : options[2];
  if (yearProp) year = getStyle(yearProp, 2);
  if (year) {
    let directive = codes.year[year];
    directives.push('%' + directive);
  }

  const assemble = directives.join(' ');
  log(assemble);
  // const test = strftime(assemble, date);

  return {};
};

module.exports = parser;
