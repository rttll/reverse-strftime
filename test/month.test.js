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
            expect(month.punctuation).toBe('. ');
          })
          .catch(console.error);
      });

      test.each([
        // ['ignores alphanumeric', 'Jun.21, 2020', '.'],
        ['ignores extra spacing', 'Jun.  21, 2020', '. '],
        ['allows grammar mistakes', 'September. 21, 2020', '. '],
      ])('%s', (memo, input, expected) => {
        getMonth(input.split(' '))
          .then((month) => {
            expect(month.punctuation).toBe(expected);
          })
          .catch(console.error);
      });
    });
  });

  describe('No month option', () => {
    it('returns null', () => {
      let input = 'Monday';
      getMonth(input.split(' '), true)
        .then((month) => {
          expect(month).toBe(null);
        })
        .catch(console.error);
    });
  });

  // describe('does not contain valid month name', () => {
  //   // TODO: maybe don't do this.
  //   // Instead use strftime to return results and it iwll be inocrrect there...?
  //   it.todo('returns undefined');
  // });

  describe('Contains integer month', () => {
    describe('Has weekday', () => {
      it('directive is %m', async () => {
        try {
          let input = 'Sat. 1';
          let month = await getMonth(input.split(' '), true);
          expect(month.directive).toBe('%m');
        } catch (error) {
          console.error(error);
        }
      });
    });
    describe('Has slashes', () => {
      it('directive is %m', async () => {
        try {
          let input = '04/4/4444';
          let month = await getMonth(input.split(' '), true);
          expect(month.directive).toBe('%m');
        } catch (error) {
          console.error(error);
        }
      });
    });
    describe('Has dashes', () => {
      it('directive is %m', async () => {
        try {
          let input = '04-4-4444';
          let month = await getMonth(input.split(' '), true);
          expect(month.directive).toBe('%m');
        } catch (error) {
          console.error(error);
        }
      });
    });
  });
});
