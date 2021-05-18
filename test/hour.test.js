const getValues = require('../lib/util/values');
const setSequence = require('../lib/util/sequence');
const { hour } = require('../lib/parsers/hour');

const log = console.log;

describe('hour()', () => {
  describe.each([
    [
      'en-US',
      'Sun. 1/23/2222 4pm',
      '2-digit',
      { name: '4', style: '12-numeric' },
    ],
    ['en-US', '1/23/2222', '2-digit', null],
    [
      'en-US',
      'Tuesday Januray 1, 3030 12:30:04',
      'long',
      { name: '12', style: '24-2-digit' },
    ],
    ['en-US', 'Tuesday Jan. 1, 3030', 'short', null],
    ['en-GB', '31-1-20 06PM', '2-digit', { name: '06', style: '12-2-digit' }],

    [
      'en-GB',
      'Mon. 14/1/20 3:12:23 PM',
      '2-digit',
      { name: '3', style: '12-numeric' },
    ],
    [
      'et-EE',
      'Sun. 31/12/2222 4pm',
      '2-digit',
      { name: '4', style: '12-numeric' },
    ],
    ['et-EE', 'Sun. 31/11 4pm', '2-digit', null],
    ['ko-KP', 'Sun. 2021. 5. 17.', '2-digit', null],
    ['bs', 'Sunday 17.5.2021.', '2-digit', null],
    ['mn', 'Sunday 2021.05.17', '2-digit', null],
  ])('%s', (locale, dateString, monthStyle, expected) => {
    test(`returns ${expected}`, async () => {
      let sequence = setSequence({ locale: locale }),
        values = getValues(dateString.split(' '));
      sequence.filter((obj) => obj.type === 'month')[0].value = {
        style: monthStyle,
      };
      let match = await hour(values, sequence);
      expect(match).toEqual(expected);
      // try {
      // } catch (error) {
      //   console.error(error);
      // }
    });
  });
});
