const getMonth = require('../lib/parsers/month');

describe('Month', () => {
  describe('Options include long month name', () => {
    it('month.directive is %B', () => {
      const options = ['January', '1,', '2021', '5:40', 'pm'];
      getMonth(options, (weekday = false))
        .then((month) => {
          expect(month.directive).toBe('%B');
        })
        .catch(console.error);
    });
  });

  describe('Options include weekday', () => {
    it('should select correct date part', () => {
      const options = 'Monday January 1'.split(' ');
      getMonth(options, (weekday = true))
        .then((month) => {
          expect(month.directive).toBe('%B');
        })
        .catch(console.error);
    });

    describe('Options include weekday but weekday param is incorrect', () => {
      it('should select correct date part', () => {
        const options = 'Monday January 1'.split(' ');
        getMonth(options, (weekday = false))
          .then((month) => {
            expect(month).toBe(undefined);
          })
          .catch(console.error);
      });
    });
  });

  describe('Options contains short month', () => {
    it('month.directive should be', () => {
      const options = 'Jan 1'.split(' ');
      getMonth(options, (weekday = false))
        .then((month) => {
          expect(month.directive).toBe('%b');
        })
        .catch(console.error);
    });

    describe('with punctuation', () => {
      it('returns punctuation and spacing', () => {
        const str = 'Jun. 21, 2020';
        getMonth(str.split(' '))
          .then((month) => {
            expect(month.punctuation).toBe('.');
          })
          .catch(console.error);
      });

      test.each([
        // ['ignores alphanumeric', 'Jun.21, 2020', '.'],
        ['ignores extra spacing', 'Jun.  21, 2020', '.'],
        ['allows grammar mistakes', 'September. 21, 2020', '.'],
      ])('%s', (memo, input, expected) => {
        getMonth(input.split(' '))
          .then((month) => {
            expect(month.punctuation).toBe(expected);
          })
          .catch(console.error);
      });
    });
  });

  // describe('does not contain valid month name', () => {
  //   // TODO: maybe don't do this.
  //   // Instead use strftime to return results and it iwll be inocrrect there...?
  //   it.todo('returns undefined');
  // });

  // describe('Contains no month name', () => {
  //   describe('contains integer', () => {
  //     it('returns 2-digit data', () => {
  //       const strings = ['Saturday 02/24/1982', '12'];
  //       for (const str of strings) {
  //         const month = getMonth(str);
  //         expect(month.style).toBe('2-digit');
  //       }
  //     });
  //   });

  //   describe('contains 1 digit integer', () => {
  //     it.todo('throws error?');
  //   });
  // });
});
