const getWeekday = require('../lib/parsers/weekday');

describe('getWeekday', () => {
  describe('Full weekday passed in', () => {
    it("style should be 'long' ", () => {
      const weekday = getWeekday('Saturday Jun 1');
      expect(weekday.style).toBe('long');
    });

    it('name should match', () => {
      const weekday = getWeekday('Saturday Jun 1');
      expect(weekday.name).toBe('Saturday');
    });
  });

  describe('Abbreviated weekday passed in', () => {
    it("style should be 'short' ", () => {
      const weekday = getWeekday('Sat 4/4');
      expect(weekday.style).toBe('short');
      expect(weekday.name).toBe('Sat');
    });

    it('name should match', () => {
      const weekday = getWeekday('Sat June 1, 2020');
      expect(weekday.name).toBe('Sat');
    });
  });

  describe('with punctuation', () => {
    test.each([
      ['With space', 'Saturday June 1', ' '],
      ['With space (short name)', 'Sat Jun', ' '],
      ['With . (short name)', 'Sat. March', '. '],
    ])('%s', (memo, input, expected) => {
      const weekday = getWeekday(input);
      expect(weekday.punctuation).toBe(expected);
    });
  });

  it.todo('these tests should pass w/o month passed in');
  // e.g. Saturday. Works from commandline tho
});
