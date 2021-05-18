const getValues = require('../lib/util/values');
const setSequence = require('../lib/util/sequence');
const {
  month,
  getNameMatch,
  getNumericMatch,
} = require('../lib/parsers/month');

describe('month()', () => {
  describe('No matches', () => {
    it('Returns null', async () => {
      const sequence = setSequence({ locale: 'en-US' });
      let values = getValues('Monday'.split(' '));
      let match = await month(values, sequence);
      expect(match).toBe(null);
    });
  });

  describe('with alphabetic names', () => {
    describe('en-GB', () => {
      it('Returns month', async () => {
        let sequence = setSequence({ locale: 'en-GB' }),
          values = getValues('Mon. 1 June, 3030'.split(' ')),
          match = await month(values, sequence);
        expect(match.name).toBe('June');
      });
    });

    describe('Locale is en-US', () => {
      it('Returns month', async () => {
        let sequence = setSequence({ locale: 'en-US' }),
          values = getValues('Mon. Sep. 1 3030'.split(' ')),
          match = await month(values, sequence);
        expect(match.name).toBe('Sep');
      });
    });
  });

  describe('Numeric values', () => {
    describe.each([
      ['en-GB', 'Mon. 14/1/20 3:12:23 PM', '1'],
      ['en-US', 'Sun. 1/23/2222 4pm', '1'],
      ['et-EE', 'Sun. 31/12/2222 4pm', '12'],
      ['ko-KP', 'Sun. 2021. 5. 17.', '5'],
      ['bs', 'Sunday 17.5.2021.', '5'],
      ['mn', 'Sunday 2021.05.17', '05'],
    ])('%s', (locale, dateString, expected) => {
      test(`returns ${expected}`, async () => {
        let sequence = setSequence({ locale: locale }),
          values = getValues(dateString.split(' ')),
          match = await month(values, sequence);
        expect(match.name).toBe(expected);
      });
    });
  });
});
