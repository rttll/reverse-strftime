const strftime = require('strftime');
const validate = require('./validate');
const getWeekDay = require('./weekday');
const getMonth = require('./month');
const getStyle = require('./format');
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
    // log(weekday);
    directives.push(getDirective('weekday', weekday.style));
  }

  month = getMonth(str);
  if (month) {
    log(month);
    directives.push(getDirective('month', month.style));
  }

  const dayProp = weekday ? options[2] : options[1];
  if (dayProp) day = getStyle(dayProp, 1);
  if (day) {
    directives.push(getDirective('day', day.style));
  }

  const yearProp = weekday ? options[3] : options[2];
  if (yearProp) year = getStyle(yearProp, 2);
  if (year) {
    directives.push(getDirective('year', year.style));
  }

  return { directives };
};

module.exports = parser;
