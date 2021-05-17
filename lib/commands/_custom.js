const directive = require('../util/directive');
const { weekday } = require('../parsers/weekday');
const { month } = require('../parsers/month');
const { day } = require('../parsers/day');
const { year } = require('../parsers/year');
const { hour } = require('../parsers/hour');
const { minute } = require('../parsers/minute');
const { second } = require('../parsers/second');
const meridian = require('../parsers/meridian');

const getValues = require('../util/values');
const setSequence = require('../util/sequence');

const fn = {
  weekday: weekday,
  month: month,
  day: day,
  year: year,
  hour: hour,
  minute: minute,
  second: second,
  dayPeriod: meridian,
};

const log = console.log;

async function getMatches(sequence, values) {
  const getIndex = (type) => {
    let types = sequence
      .filter((obj) => obj.type !== 'literal')
      .map((obj) => obj.type);
    return types.indexOf(type);
  };

  const valuesLength = values.filter((obj) => obj.type !== 'literal').length;
  const sequenceValues = sequence.filter((obj) => obj.type !== 'literal');
  // log(sequenceValues);
  for (let i = 0; i < sequenceValues.length; i++) {
    const obj = sequenceValues[i];
    // log(obj);
    // if (i > valuesLength - 1) break;
    try {
      let parser = fn[obj.type];
      if (typeof parser === 'function') {
        obj.value = await fn[obj.type](values, sequence, getIndex(obj.type));
      } else {
        log('no parser' + obj.type);
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
      // console.log('value for', i, obj.type, obj.values);
      if (obj.values.length === 1) {
        obj.value = obj.values[0];
        // } else if (i > obj.values.length) {
        //   obj.value = obj.values[obj.values.length - 1];
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
  // log('date', date);
  let sequence = setSequence(options);
  let values = getValues(date);
  // log('valus', values);
  await getMatches(sequence, values);
  log(sequence);

  // parseMatches(sequence, values);
  return sequence;
};
