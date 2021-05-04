const getWeekday = require('../parsers/weekday');
const getMonth = require('../parsers/month');
const getDay = require('../parsers/day');
const getYear = require('../parsers/year');
const getTime = require('../parsers/time');

const components = {
  weekday: null,
  month: null,
  day: null,
  year: null,
  hour: null,
  minute: null,
  second: null,
  meridian: null,
};

function empty(array) {
  if (!Array.isArray(array)) {
    throw 'oh no';
  }
  return array.length === 0;
}

const log = console.log;
let resolved, parts;
const preset = (options) => {
  log(options);
  let date = new Date();
  let dateOptions = {
    dateStyle: options.short ? 'short' : 'full',
  };
  if (options.time) {
    dateOptions.timeStyle = options.short ? 'short' : 'medium';
  }
  let formatter = new Intl.DateTimeFormat(options.locale, dateOptions);

  let formatted = formatter.format(date);

  resolved = formatter.resolvedOptions();
  parts = formatter.formatToParts(date);
  return formatted;
};

module.exports = async (date, options) => {
  if (empty(date)) {
    date = preset(options);
  }
  log(date);
  // log(resolved);
  // log(parts);
  return;

  components.weekday = await getWeekday(date);
  components.month = await getMonth(date, components.weekday);
  components.day = await getDay(date, components.weekday);
  components.year = await getYear(date, components.weekday);

  await getTime(date, components);

  // log(components);

  const string = Object.keys(components)
    .map((key) => components[key])
    .filter((obj) => obj)
    .map((obj) => {
      return `${obj.before || ''}${obj.directive}${obj.punctuation || ''}`;
    })
    .join('');
  return { string };
};
