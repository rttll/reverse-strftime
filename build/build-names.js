const fs = require('fs');
const path = require('path');
const times = require('../lib/util/times');

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

const langs = [
  { description: 'English', tag: 'en' },
  { description: 'Chinese', tag: 'zh' },
  { description: 'Russian', tag: 'ru' },
  { description: 'German', tag: 'de' },
  { description: 'Romanian', tag: 'ro' },
  { description: 'Polish', tag: 'pl' },
  { description: 'Hungarian', tag: 'hu' },
  { description: 'Slovak', tag: 'sk' },
  { description: 'Spanish', tag: 'es' },
  { description: 'Italian', tag: 'it' },
  { description: 'French', tag: 'fr' },
];

const getName = (part, locale, format) => {
  try {
    let string = date.toLocaleString(locale, { [part]: format });
    return string;
  } catch (error) {}
};

const date = new Date();
const getMonths = (locale) => {
  const out = [];
  times(12, (i) => {
    date.setMonth(i);
    for (const style of ['long', 'short']) {
      out.push({
        name: getName('month', locale, style),
        style: style,
      });
    }
  });
  return out;
};

const getDays = (locale) => {
  const out = [];
  times(7, (i) => {
    date.setDate(i + 1);
    for (const style of ['long', 'short']) {
      out.push({
        name: getName('weekday', locale, style),
        style: style,
      });
    }
  });
  return out;
};

const names = [];

for (let data of langs) {
  let name = {
    description: data.description,
    month: getMonths(data.tag),
    weekday: getDays(data.tag),
  };
  names.push(name);
}

const content = `
  const names = ${JSON.stringify(names)};
  module.exports = names
`;

const file = path.resolve(__dirname, '../lib/config/names.js');
fs.writeFile(file, content, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
