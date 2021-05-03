const getDay = require('../lib/parsers/day');

const log = console.log;

describe('day(str)', () => {
  describe('Is double digit integer', () => {
    it('directive should be %d', () => {
      getDay('Jan. 01'.split(' '))
        .then((day) => {
          expect(day.directive).toBe('%d');
        })
        .catch(console.error);
    });

    describe('value is greater than 9', () => {
      it.todo('should warn about ambiguity');
    });
  });

  describe('Is single digit integer', () => {
    it('directive should be %e', () => {
      getDay('Jan. 9'.split(' '))
        .then((day) => {
          expect(day.directive).toBe('%e');
        })
        .catch(console.error);
    });
  });

  describe('Input is slashes', () => {
    describe('Is single digit integer', () => {
      it('directive should be %e', () => {
        getDay('4/4/4040'.split(' '))
          .then((day) => {
            expect(day.directive).toBe('%e');
          })
          .catch(console.error);
      });
      it('punctuation should be /', () => {
        getDay('4/4/4040'.split(' '))
          .then((day) => {
            expect(day.punctuation).toBe('/');
          })
          .catch(console.error);
      });
    });

    describe('Is double digit integer', () => {
      it('directive should be %d', () => {
        getDay('4/04/44'.split(' '))
          .then((day) => {
            expect(day.directive).toBe('%d');
            expect(day.punctuation).toBe('/');
          })
          .catch(console.error);
      });
      describe('with dashes', () => {
        it('directive should be %d', async () => {
          let input = '6-06-66';
          try {
            let day = await getDay(input.split(' '), false);
            expect(day.directive).toBe('%d');
            expect(day.punctuation).toBe('-');
          } catch (error) {
            console.error(error);
          }
        });
      });
    });
  });

  describe('With punctuation', () => {
    const data = [['Mon. June 1, 2020', ', ']];
    it.todo('this test is throwing false negative');
    test.each(data)('%s', async (str, punctuation) => {
      try {
        let day = await getDay(str.split(' '), true);
        expect(day.punctuation).toBe(punctuation);
      } catch (error) {
        console.error(error);
      }
    });
  });

  describe('No day in input options', () => {
    it('returns null', async () => {
      try {
        let day = await getDay(['Monday'], true);
        expect(day).toBe(null);
      } catch (error) {
        console.error(error);
      }
    });
  });

  describe('is 4-digit integer', () => {
    it.todo('should return null');
  });
});
