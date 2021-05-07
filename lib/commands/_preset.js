const chalk = require('chalk');
const directive = require('../util/directive');
const { getWeekday } = require('../parsers/weekday');
const { getNumericMatch, getNameMatch } = require('../parsers/month');
const { getDay } = require('../parsers/day');
const { getYear } = require('../parsers/year');

const fn = {
  weekday: getWeekday,
  day: getDay,
  year: getYear,
  // time: require('../parsers/time'),
};

const log = console.log;

function setSequence(options) {
  let dateOptions = {
    dateStyle: options.short ? 'short' : 'full',
  };
  if (options.time) dateOptions.timeStyle = options.short ? 'short' : 'medium';

  try {
    var formatter = new Intl.DateTimeFormat(options.locale, dateOptions);
    // log(formatter.format(new Date()));
    return formatter.formatToParts(new Date());
  } catch (error) {
    let message = 'unknown error. Maybe verify locale';
    if (error.message) {
      message = error.message;
    }
    console.log(chalk.red('Err:') + ' ' + message);
    return false;
  }
}

async function getMatches(sequence, values) {
  for (let i = 0; i < sequence.length; i++) {
    const obj = sequence[i];

    if (obj.type === 'literal') continue;
    if (obj.type === 'month') {
      let match = /[0-9]/.test(obj.value)
        ? getNumericMatch(obj.value)
        : getNameMatch(obj.value);
      obj.directive = directive(obj.type, match.style);
    } else {
      if (typeof fn[obj.type] === 'function') {
        let match = await fn[obj.type](obj.value);
        obj.directive = directive(obj.type, match.style);
      }
    }
  }
}

module.exports = async (options) => {
  let sequence = setSequence(options);
  await getMatches(sequence);
  return sequence;
};
