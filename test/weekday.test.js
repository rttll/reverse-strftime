const getWeekday = require('../lib/parsers/weekday');

describe('getWeekday', () => {
  describe('Options include ull weekday', () => {
    it("style should be 'long' ", () => {
      getWeekday('Saturday Jun 1'.split(' '))
        .then((weekday) => {
          expect(weekday.style).toBe('long');
          expect(weekday.name).toBe('Saturday');
        })
        .catch(console.error);
    });
  });

  describe('Abbreviated weekday passed in', () => {
    it("style should be 'short' ", () => {
      getWeekday('Sat 4/4'.split(' '))
        .then((weekday) => {
          expect(weekday.style).toBe('short');
          expect(weekday.name).toBe('Sat');
        })
        .catch(console.error);
    });
  });

  describe('with punctuation', () => {
    test.each([
      ['With space', 'Saturday June 1', ' '],
      ['With space (short name)', 'Sat Jun', ' '],
      ['With . (short name)', 'Sat. March', '. '],
    ])('%s', (memo, input, expected) => {
      getWeekday(input.split(' '))
        .then((weekday) => {
          expect(weekday.punctuation).toBe(expected);
        })
        .catch(console.error);
    });
  });

  it.todo('these tests should pass w/o month passed in');
  // e.g. Saturday. Works from commandline tho
});
