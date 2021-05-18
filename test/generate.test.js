const setSequence = require('../lib/util/sequence');
const getValues = require('../lib/util/values');
const generate = require('../lib/commands/generate');

describe('generate()', () => {
  describe('Custom date string', () => {
    describe.each([
      ['en-US', 'Sun. 1/23/2222 4pm', '%a. %m/%d/%Y %l%P'],
      ['en-US', '1/23/2222', '%m/%d/%Y'],
      ['en-US', 'Tuesday January 1, 3030', '%A %B %e, %Y'],
      ['en-US', 'Tuesday Jan. 1, 3030', '%A %b. %e, %Y'],

      ['en-GB', '31-1-20', '%d-%m-%y'],
      // en-Gb will not return value for the time period/meridian
      ['en-GB', 'Mon. 14/1/20 3:12:23 PM', '%a. %d/%m/%y %l:%M:%S'],

      ['et-EE', 'Sunday 31/12/2222 4pm', '%A %d/%m/%Y %l'],
      ['et-EE', 'Sun. 31/11 4pm', '%a. %d/%m %y'],
      ['ko-KP', 'Sun. 2021. 5. 17.', '%Y. %m. %d.%a. '],
      ['bs', 'Sunday 17.5.2021.', '%A %d.%m.%Y.'],
      ['mn', 'Sunday 2021.05.17', '%Y.%m.%d%A '],
    ])('%s', (locale, dateString, expected) => {
      test(`returns ${expected}`, async () => {
        let gen = await generate(dateString.split(' '), { locale });
        expect(gen.string).toBe(expected);
      });
    });
  });
});
