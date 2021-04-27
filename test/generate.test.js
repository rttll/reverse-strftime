const generate = require('../lib/commands/generate');

describe('generate()', () => {
  describe('With string months', () => {
    test.each([
      ['Full month', 'June 1, 2020', '%B %e, %Y'],
      ['Short month', 'Sep 1, 2020', '%b %e, %Y'],
      ['Short month punc', 'Sep. 1, 2020', '%b. %e, %Y'],
    ])('%s', (memo, input, expected) => {
      let generated = generate(input);
      expect(generated.string).toBe(expected);
    });

    describe('With weekday', () => {
      test.each([
        ['Full day', 'Monday June 1, 2020', '%A %B %e, %Y'],
        ['Short day + punc + short month', 'Mon. Sep 1, 2020', '%a. %b %e, %Y'],
        ['Short day + punc', 'Wed. Sep. 1, 2020', '%a. %b. %e, %Y'],
      ])('%s', (memo, input, expected) => {
        let generated = generate(input);
        expect(generated.string).toBe(expected);
      });
    });
  });
});
