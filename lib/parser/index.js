const strftime = require('strftime');
const codes = require('../codes');
const names = require('../names');
const validate = require('./validate');
const getWeekDay = require('./weekday');
const getMonth = require('./month');
const getStyle = require('./style');

const log = console.log;

let options, str, weekday, day, month, year, weekdayOnly;

const parser = (inputOptions) => {
  options = inputOptions.date;
  str = options.join(' ');

  const valid = validate(str);
  if (!valid) return { error: 'Invalid date' };

  month = getMonth(str);
  log('month', month);
  // TODO day style will be wrong if there is no month name passed in. so, detect if style is slashes or dashes
  const dayProp = weekday ? options[2] : options[1];
  day = getStyle(dayProp, 1);

  const yearProp = weekday ? options[3] : options[2];
  year = getStyle(yearProp, 2);

  let m = codes.month[month.style];
  let d = codes.day[day];
  let y = codes.year[year];

  const assemble = `%${m} %${d} %${y}`;
  log(assemble);
  // const test = strftime(assemble, date);
  // log(test);

  return {};
};

module.exports = parser;
