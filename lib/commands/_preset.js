const chalk = require('chalk');
const directive = require('../util/directive');

const log = console.log;

function setSequence(options) {
  let dateOptions = {
    dateStyle: options.short ? 'short' : 'full',
  };
  if (options.time) dateOptions.timeStyle = options.short ? 'short' : 'medium';

  try {
    var formatter = new Intl.DateTimeFormat(options.locale, dateOptions);
    log(formatter.format(new Date()));
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

module.exports = (options) => {
  let sequence = setSequence(options);

  log('preset', sequence);
  return sequence;
};
