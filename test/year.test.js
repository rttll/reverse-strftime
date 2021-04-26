const year = require('../lib/parser/year');

const log = console.log;

describe('year(str)', () => {
  describe('Is double digit integer', () => {
    const data = [['21'], ['12'], ['99']];
    test.each(data)('day(%s)', (str) => {
      const result = year(str);
      expect(result.style).toBe('2-digit');
    });
  });

  describe('Is 4-digit integer', () => {
    const data = [['1999'], ['9999'], ['1000']];
    test.each(data)('day(%s)', (str) => {
      const result = year(str);
      expect(result.style).toBe('numeric');
    });
  });

  describe('has surrounding punctuation', () => {
    const data = [
      ['.99.', '99', '2-digit'],
      ['/9999', '9999', 'numeric'],
      ['..1000///!', '1000', 'numeric'],
    ];
    test.each(data)('day(%s)', (str, out, style) => {
      const result = year(str);
      expect(result.year).toBe(out);
      expect(result.style).toBe(style);
    });
  });

  describe('is empty string', () => {
    it('should return null', () => {
      const result = year('');
      expect(result).toBe(null);
    });
  });

  describe('is time format', () => {
    // 12pm, 1:20AM
    it.todo('should return null');
  });
});
