const getValues = require('../lib/util/values');
const setSequence = require('../lib/util/sequence');
const { day, getDay } = require('../lib/parsers/day');

const log = console.log;

describe('day()', () => {
  describe.each([
    ['en-US', 'Sun. 1/23/2222 4pm', '2-digit', '23'],
    ['en-US', '1/23/2222', '2-digit', '23'],
    ['en-US', 'Tuesday Januray 1, 3030', 'long', '1'],
    ['en-US', 'Tuesday Jan. 1, 3030', 'short', '1'],
    ['en-GB', '31-1-20', '2-digit', '31'],
    ['en-GB', 'Mon. 14/1/20 3:12:23 PM', '2-digit', '14'],
    ['et-EE', 'Sun. 31/12/2222 4pm', '2-digit', '31'],
    ['et-EE', 'Sun. 31/11 4pm', '2-digit', '31'],
    ['ko-KP', 'Sun. 2021. 5. 17.', '2-digit', '17'],
    ['bs', 'Sunday 17.5.2021.', '2-digit', '17'],
    ['mn', 'Sunday 2021.05.17', '2-digit', '17'],
  ])('%s', (locale, dateString, monthStyle, expected) => {
    test(`returns ${expected}`, async () => {
      let sequence = setSequence({ locale: locale }),
        values = getValues(dateString.split(' '));
      sequence.filter((obj) => obj.type === 'month')[0].value = {
        style: monthStyle,
      };
      let match = await day(values, sequence);
      expect(match.name).toBe(expected);
    });
  });

  // describe('with month and time', () => {
  //   describe.each([
  //     ['en-US', 'Sun. 1 4pm', null],
  //     ['en-US', 'Sun. 12 4pm', null],
  //     ['en-US', 'Sun. 1/23 4pm', { name: '23', style: '2-digit' }],
  //     ['en-GB', 'Sun. 1 4pm', { name: '1', style: 'numeric' }],
  //   ])('%s %s', (locale, dateString, expected) => {
  //     test.only(`returns ${expected}`, async () => {
  //       let sequence = setSequence({ locale: locale }),
  //         values = getValues(dateString.split(' '));
  //       sequence.filter((obj) => obj.type === 'month')[0].value = {
  //         style: '2-digit',
  //       };
  //       let match = await day(values, sequence);

  //       expect(match).toEqual(expected);
  //     });
  //   });
  // });

  // describe('just time', () => {
  //   describe.each([
  //     ['en-US', 'Sun. 4pm', null],
  //     ['en-GB', '12pm', null],
  //   ])('%s %s', (locale, dateString, expected) => {
  //     test.only(`returns ${expected}`, async () => {
  //       let sequence = setSequence({ locale: locale }),
  //         values = getValues(dateString.split(' '));
  //       sequence.filter((obj) => obj.type === 'month')[0].value = {};
  //       let match = await day(values, sequence);

  //       expect(match).toEqual(expected);
  //     });
  //   });
  // });
});
