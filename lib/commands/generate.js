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

let inputString;

const stripComponentNameFromString = (styleData) => {
  const regx = new RegExp(`${styleData.name}${styleData.punctuation || ''}`);
  inputString = inputString.replace(regx, '').trim();
};

module.exports = async (inputOptions) => {
  inputString = inputOptions;

  let weekday = getWeekday(inputString);
  if (weekday) {
    weekday.directive = getDirective('weekday', weekday.style);
    components.weekday = weekday;
    stripComponentNameFromString(weekday);
  }

  let month = getMonth(inputString);
  if (month) {
    month.directive = getDirective('month', month.style);
    components.month = month;
    stripComponentNameFromString(month);
  }

  let day = getDay(inputString);
  if (day) {
    day.directive = getDirective('day', day.style);
    components.day = day;
    stripComponentNameFromString(day);
  }

  let year = getYear(inputString);
  if (year) {
    year.directive = getDirective('year', year.style);
    components.year = year;
    stripComponentNameFromString(year);
  }

  let hour = await getHour(inputString);
  if (hour) {
    hour.directive = getDirective('hour', hour.style);
    components.hour = hour;
    stripComponentNameFromString(hour);
  }

  let minute = await getMinute(inputString);
  if (minute) {
    minute.directive = getDirective('minute', minute.style);
    components.minute = minute;
    stripComponentNameFromString(minute);
  }

  let second = await getSecond(inputString);
  if (second) {
    second.directive = getDirective('second', second.style);
    components.second = second;
    stripComponentNameFromString(second);
  }

  const toA = (obj) => {
    const arr = [];
    for (const key in obj) {
      let prop = obj[key];
      if (prop) {
        prop.key = key;
        arr.push(prop);
      } else {
        arr.push({ [key]: prop });
      }
    }
    return arr;
  };

  const string = toA(components)
    .filter((obj) => obj.directive)
    .map((obj) => {
      return `${obj.directive}${obj.punctuation || ''}`;
    })
    .join('');
  return { string };
};
