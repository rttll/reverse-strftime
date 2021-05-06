const chalk = require('chalk');
const fn = {
  weekday: require('../parsers/weekday'),
  month: require('../parsers/month'),
  day: require('../parsers/day'),
  year: require('../parsers/year'),
  // time: require('../parsers/time'),
};

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

const log = console.log;

let input;

function setPresetSequence(options) {
  let dateOptions = {
    dateStyle: options.short ? 'short' : 'full',
  };
  if (options.time) dateOptions.timeStyle = options.short ? 'short' : 'medium';

  try {
    var formatter = new Intl.DateTimeFormat(options.locale, dateOptions);
    input = formatter.format(new Date()).split(' ');
    // sequence
    return formatter.formatToParts(new Date());
  } catch (error) {
    let message = 'unknown error. Maybe verify locale';
    if (error.message) {
      message = error.message;
    }
    console.log(chalk.red('Err:') + ' ' + message);
  }
}

function setSequence(options) {
  let formatter = new Intl.DateTimeFormat(options.locale, {
    dateStyle: options.short ? 'short' : 'full',
    timeStyle: options.short ? 'short' : 'medium',
  });
  let parts = formatter.formatToParts(new Date());
  return parts.map((obj) => ({ ['type']: obj.type }));
}

function getCustom() {
  let typed = [];
  for (let char of input.join(' ').split('')) {
    let type = char.match(/[0-9]/)
      ? 'int'
      : char.match(/[a-zA-Z]/)
      ? 'alpha'
      : 'literal';
    typed.push({ type: type, value: char });
  }

  let merged = [];
  for (let obj of typed) {
    if (merged.length === 0) {
      merged.push(obj);
      continue;
    }
    let lastOut = merged[merged.length - 1];
    if (obj.type === lastOut.type) {
      lastOut.value += obj.value;
    } else {
      merged.push(obj);
    }
  }

  return merged;
}

module.exports = async (date, options) => {
  let sequence;

  if (options.auto) {
    sequence = setPresetSequence(options);
  } else {
    input = date;
    sequence = setSequence(options);
    var parts = sequence.filter((obj) => obj.type !== 'literal');
    var values = getCustom();
  }

  if (!sequence) return false;

  for (let i = 0; i < parts.length; i++) {
    const obj = parts[i];
    log(obj);
  }

  log(values);

  // log(sequence);

  // let parts = sequence.filter((obj) => obj.type !== 'literal');
  // for (let i = 0; i < parts.length; i++) {
  //   let part = parts[i];
  //   try {
  //     let location = options.auto ? i : null;
  //     components[part.type] = await fn[part.type](
  //       input,
  //       components.weekday,
  //       location
  //     );
  //   } catch (error) {}
  // }

  // const string = parts
  //   .filter(({ type }) => components[type])
  //   .map(({ type }) => {
  //     let obj = components[type];
  //     return `${obj.before || ''}${obj.directive}${obj.punctuation || ''}`;
  //   })
  //   .join('');
  // return { string };
};
