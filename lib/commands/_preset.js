const chalk = require('chalk');
const directive = require('../util/directive');

const log = console.log;

function setSequence(options) {
  let dateOptions = {
    dateStyle: options.short ? 'short' : 'full',
    timeStyle: options.short ? 'short' : 'medium',
  };

  try {
    var formatter = new Intl.DateTimeFormat(options.locale, dateOptions);
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

function getStyle(obj, short, hasDayPeriod) {
  let style;
  switch (obj.type) {
    case 'weekday':
      style = short ? 'short' : 'long';
      break;
    case 'month':
      style = short ? '2-digit' : 'long';
      break;
    case 'day':
      style = short ? 'numeric' : '2-digit';
      break;
    case 'year':
      style = short ? '2-digit' : 'numeric';
      break;
    case 'hour':
      if (hasDayPeriod) {
        style = short ? '12-numeric' : '12-2-digit';
      } else {
        style = short ? '24-numeric' : '24-2-digit';
      }
      break;
    case 'dayPeriod':
      style = short ? 'lower' : 'caps';
      break;
    default:
      // min/sec
      style = '2-digit';
      break;
  }
  return style;
}

async function getStyles(sequence, options) {
  for (let i = 0; i < sequence.length; i++) {
    const obj = sequence[i];
    if (obj.type === 'literal') continue;
    let hasDayPeriod =
      sequence.filter((obj) => obj.type === 'dayPeriod').length > 0;
    let style = getStyle(obj, options.short, hasDayPeriod);
    obj.directive = directive(obj.type, style);
  }
}

module.exports = async (options) => {
  let sequence = setSequence(options);
  await getStyles(sequence, options);
  return sequence;
};
