const validate = require('../parsers/validate');
const getDirective = require('../parsers/directive');
const getWeekday = require('../parsers/weekday');
const getMonth = require('../parsers/month');
const getDay = require('../parsers/day');
const getYear = require('../parsers/year');
const getHour = require('../parsers/hour');
const getMinute = require('../parsers/minute');
const getSecond = require('../parsers/second');

const components = {
  weekday: null,
  month: null,
  day: null,
  year: null,
  hour: null,
  minute: null,
  second: null,
};

const log = console.log;

module.exports = async (options) => {
  components.weekday = await getWeekday(options);
  components.month = await getMonth(options, components.weekday);
  components.day = await getDay(options, components.weekday);
  components.year = await getYear(options, components.weekday);

  const string = Object.keys(components)
    .map((key) => components[key])
    .filter((obj) => obj)
    .map((obj) => {
      return `${obj.directive}${obj.punctuation || ''}`;
    })
    .join('');
  return { string };
};
