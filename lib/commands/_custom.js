const directive = require('../util/directive');
const { weekday } = require('../parsers/weekday');
const { month } = require('../parsers/month');
const { day } = require('../parsers/day');
const { year } = require('../parsers/year');
const { hour } = require('../parsers/hour');
const { minute } = require('../parsers/minute');
const { second } = require('../parsers/second');
const { meridian } = require('../parsers/meridian');

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
  const sequenceValues = sequence.filter((obj) => obj.type !== 'literal');
  for (let i = 0; i < sequenceValues.length; i++) {
    const obj = sequenceValues[i];
    try {
      let parser = fn[obj.type];
      if (typeof parser === 'function') {
        obj.value = await fn[obj.type](values, sequence, getIndex(obj.type));
        // log(obj.type + ' => ' + obj.value.name + ' ' + obj.value.style);
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

      let correspondingObjInSequence = sequence[indexInSequence + 1];
      if (correspondingObjInSequence) {
        correspondingObjInSequence.value = values[nextLiteralIndex].value;
      } else {
        // User input a date part not present in the sequence.
        // See note about sl/vl below
      }
    }
  };

  let withValues = sequence.filter(
    (obj) => obj.type !== 'literal' && obj.value
  );
  for (let i = 0; i < withValues.length; i++) {
    const obj = withValues[i];
    try {
      if (obj.value) {
        setLiteralValue(obj);
        obj.directive = directive(obj.type, obj.value.style);
      } else {
        log('no value', obj);
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
  await getMatches(sequence, values);

  parseMatches(sequence, values);

  // TODO if sl/vl (below) are different it means user input includes
  // a date part not usually included in the locale sequence
  // e.g. adding AM when the locale is en-GB, because en-GB does not use am/pm

  let sl = sequence.filter((obj) => obj.type !== 'literal').length;
  let vl = values.filter((obj) => obj.type !== 'literal').length;

  return sequence;
};
