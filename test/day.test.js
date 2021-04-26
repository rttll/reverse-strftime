const getDay = require('../lib/parser/day');

const log = console.log;

describe('day(str)', () => {
  describe('Is double digit integer', () => {
    it('should return 2-digit style', () => {
      const strings = ['04/2021', '12', '31/9999'];
      for (const str of strings) {
        const day = getDay(str);
        expect(day.style).toBe('2-digit');
      }
    });

    describe('value is greater than 9', () => {
      it.todo('should warn about ambiguity');
    });
  });

  describe('Is single digit integer', () => {
    it('should return 2-digit style', () => {
      const strings = ['4/2021', '1', '9/9999'];
      for (const str of strings) {
        const day = getDay(str);
        expect(day.style).toBe('numeric');
      }
    });
  });

  describe('With punctuation', () => {
    const data = [
      ['4/2020', '/'],
      ['08/2020', '/'],
      ['1-2020', '-'],
      ['12 2020', ''],
      ['12 ', ''],
      ['4.2020', '.'],
      ['01', ''],
    ];
    test.each(data)('%s => %s', (str, punctuation) => {
      const day = getDay(str);
      expect(day.punctuation).toBe(punctuation);
    });
  });

  describe('is 4-digit integer', () => {
    it.todo('should return null');
  });

  describe('is empty string', () => {
    it('should return null', () => {
      const day = getDay('');
      expect(day).toBe(null);
    });
  });

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
