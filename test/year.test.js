const getValues = require('../lib/util/values');
const setSequence = require('../lib/util/sequence');
const { year } = require('../lib/parsers/year');

const log = console.log;
// ['et-EE', 'Sun. 31/11 4pm', '2-digit', null],
describe('year()', () => {
  describe.each([
    [
      'en-US',
      'Sun. 1/23/2222 4pm',
      '2-digit',
      { name: '2222', style: 'numeric' },
    ],
    [
      'en-US',
      '1/3/3030 3:23:45',
      '2-digit',
      { name: '3030', style: 'numeric' },
    ],
    ['en-US', '1-3-30 3:23:45', '2-digit', { name: '30', style: '2-digit' }],
    [
      'en-US',
      'Monday June 2020',
      '2-digit',
      { name: '2020', style: 'numeric' },
    ],
    [
      'en-US',
      'Tuesday Januray 1, 3030',
      'long',
      { name: '3030', style: 'numeric' },
    ],
    [
      'en-US',
      'Tuesday Jan. 1, 3030',
      'short',
      { name: '3030', style: 'numeric' },
    ],
    ['en-GB', '31-1-20', '2-digit', { name: '20', style: '2-digit' }],
    [
      'en-GB',
      'Mon. 14/1/20 3:12:23 PM',
      '2-digit',
      { name: '20', style: '2-digit' },
    ],
    [
      'et-EE',
      'Sun. 31/12/2222 4pm',
      '2-digit',
      { name: '2222', style: 'numeric' },
    ],

    ['et-EE', 'Sun. 31/11', '2-digit', null],
    [
      'ko-KP',
      '2021. 5. 17. Sunday',
      '2-digit',
      { name: '2021', style: 'numeric' },
    ],
    ['bs', 'Sunday 17.5.2021.', '2-digit', { name: '2021', style: 'numeric' }],
    ['mn', '4444.05.17 Sunday', '2-digit', { name: '4444', style: 'numeric' }],
  ])('%s', (locale, dateString, monthStyle, expected) => {
    test(`returns ${expected}`, async () => {
      let sequence = setSequence({ locale: locale }),
        values = getValues(dateString.split(' '));
      sequence.filter((obj) => obj.type === 'month')[0].value = {
        style: monthStyle,
      };
      // console.log(sequence);
      let match = await year(values, sequence);
      expect(match).toEqual(expected);
    });
  });
});
