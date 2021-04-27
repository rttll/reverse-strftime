const validate = require('./validate');
const getDirective = require('./directive');
const getWeekday = require('./weekday');
const getMonth = require('./month');
const getDay = require('./day');
const getYear = require('./year');

const components = {
  weekday: null,
  month: null,
  day: null,
  year: null,
};

const log = console.log;

let inputString;

const stripComponentNameFromString = (styleData) => {
  const regx = new RegExp(`${styleData.name}${styleData.punctuation || ''}`);
  inputString = inputString.replace(regx, '').trim();
};

module.exports = (inputOptions) => {
  inputString = inputOptions.date;

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
