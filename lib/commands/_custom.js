const directive = require('../util/directive');
const { weekday } = require('../parsers/weekday');
const { month } = require('../parsers/month');
const { day } = require('../parsers/day');
const { year } = require('../parsers/year');

const fn = {
  weekday: weekday,
  month: month,
  day: day,
  year: year,
  // time: require('../parsers/time'),
};

const log = console.log;

function setSequence(options) {
  let formatter = new Intl.DateTimeFormat(options.locale, {
    dateStyle: options.short ? 'short' : 'full',
    timeStyle: options.short ? 'short' : 'medium',
  });
  let parts = formatter.formatToParts(new Date());
  return parts.map((obj) => ({ ['type']: obj.type }));
}

function getValues(input) {
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

async function getMatches(sequence, values) {
  const valuesLength = values.filter((obj) => obj.type !== 'literal').length;
  const sequenceValues = sequence.filter((obj) => obj.type !== 'literal');
  for (let i = 0; i < sequenceValues.length; i++) {
    const obj = sequenceValues[i];
    if (i > valuesLength - 1) break;
    try {
      let parser = fn[obj.type];
      if (typeof parser === 'function') {
        obj.values = await fn[obj.type](values);
      }
    } catch (error) {
      log(error);
    }
  }
}

// Assign component from possible matches
// and set literal values
function parseMatches(sequence, values) {
  /**
   * Function setLiteralValue()
   * Gets the string value from values
   * and sets it in the corresponding literal in the sequence
   */
  const names = values.map((obj) => obj.value);
  const setLiteralValue = (obj) => {
    let nextLiteralIndex = names.indexOf(obj.value.name) + 1;
    if (!values[nextLiteralIndex]) return;
    if (values[nextLiteralIndex].type === 'literal') {
      let indexInSequence = null;
      sequence.filter((sobj, i) => {
        // all this does is set the indexInSequence, so no need to return anything
        if (sobj.value === obj.value) indexInSequence = i;
      });
      sequence[indexInSequence + 1].value = values[nextLiteralIndex].value;
    }
  };

  let withValues = sequence.filter(
    (obj) => obj.type !== 'literal' && obj.values
  );
  for (let i = 0; i < withValues.length; i++) {
    const obj = withValues[i];
    try {
      if (obj.values.length === 1) {
        obj.value = obj.values[0];
      } else if (i > obj.values.length) {
        obj.value = obj.values[obj.values.length - 1];
      } else {
        obj.value = obj.values[i - 1];
      }
      if (obj.value) {
        setLiteralValue(obj);
        obj.directive = directive(obj.type, obj.value.style);
      }
    } catch (error) {
      log(error);
    }
  }
}

module.exports = async (date, options) => {
  let sequence = setSequence(options);
  let values = getValues(date);
  // log(values);
  await getMatches(sequence, values);
  parseMatches(sequence, values);

  return sequence;
};
