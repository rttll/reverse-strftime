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
    });
  });

  // describe('With punctuation', () => {
  //   const data = [
  //     ['4/2020', '/'],
  //     ['08/2020', '/'],
  //     ['1-2020', '-'],
  //     ['12 2020', ' '],
  //     ['12 ', ' '],
  //     ['4.2020', '.'],
  //     ['01', ''],
  //   ];
  //   test.each(data)('%s => %s', (str, punctuation) => {
  //     const day = getDay(str);
  //     expect(day.punctuation).toBe(punctuation);
  //   });
  // });

  describe('is 4-digit integer', () => {
    it.todo('should return null');
  });

  // describe('is empty string', () => {
  //   it('should return null', () => {
  //     const day = getDay('');
  //     expect(day).toBe(null);
  //   });
  // });

  describe('has trailing time format', () => {
    // 12pm, 1:20AM
    // Jan 1 5pm
    it.todo('should return null');
  });

  describe('Has trailing ordinal', () => {
    // 1st, th, nd
    // or any alpha: 1ad, 23xyz
    it.todo('should ignore and warn');
  });
});
