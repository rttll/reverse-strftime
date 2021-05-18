const getValues = require('../lib/util/values');
const setSequence = require('../lib/util/sequence');
const { second } = require('../lib/parsers/second');

const log = console.log;

describe('second()', () => {
  describe.each([
    [
      'en-US',
      'Sun. 1/23/2222 4:30:59pm',
      '2-digit',
      { name: '59', style: '2-digit' },
    ],
    ['en-US', '1/23/2222', '2-digit', null],
    [
      'en-US',
      'Tuesday Januray 1, 3030 12:30:04',
      'long',
      { name: '04', style: '2-digit' },
    ],
    ['en-US', 'Tuesday Jan. 1, 3030', 'short', null],
    [
      'en-GB',
      '31-1-20 06:01:44PM',
      '2-digit',
      { name: '44', style: '2-digit' },
    ],

    [
      'en-GB',
      'Mon. 14/1/20 3:12:23 PM',
      '2-digit',
      { name: '23', style: '2-digit' },
    ],
    ['et-EE', 'Sun. 31/12/2222 4pm', '2-digit', null],
    [
      'et-EE',
      'Sun. 31/11/3030 4:40:40pm',
      '2-digit',
      { name: '40', style: '2-digit' },
    ],
    ['et-EE', 'Sun. 31/11 4:40pm', '2-digit', null], // Partial date
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
      let match = await second(values, sequence);
      expect(match).toEqual(expected);
    });
  });
});
