const parser = require('../lib/parser/index');

// ['Saturday June 01, 2020', '%A %B %d, %Y'], // throws false negative and screws up all these tests
const data = [['04.4.4444', '%m.%e.%Y']];

describe('parser()', () => {
  describe('With string months', () => {
    test.each([
      ['Full month', 'June 1, 2020', '%B %e, %Y'],
      ['Short month', 'Sep 1, 2020', '%b %e, %Y'],
      ['Short month punc', 'Sep. 1, 2020', '%b. %e, %Y'],
    ])('%s', (memo, input, expected) => {
      let parsed = parser({ date: input });
      expect(parsed.string).toBe(expected);
    });

    describe('With weekday', () => {
      test.each([
        ['Full day', 'Monday June 1, 2020', '%A %B %e, %Y'],
        ['Short day + punc + short month', 'Mon. Sep 1, 2020', '%a. %b %e, %Y'],
        ['Short day + punc', 'Wed. Sep. 1, 2020', '%a. %b. %e, %Y'],
      ])('%s', (memo, input, expected) => {
        let parsed = parser({ date: input });
        expect(parsed.string).toBe(expected);
      });
    });
  });
});
