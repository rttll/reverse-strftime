const getFormat = require('../lib/parser/format');

describe('getFormat', () => {
  it('should ignore punctuation', () => {
    const format = getFormat('..1990,.', 2);
    expect(format.style).toBe('2-digit');
  });

  describe('Option length is greater than threshold', () => {
    it('should return "2-digit" ', () => {
      const format = getFormat('1990', 2);
      expect(format.style).toBe('2-digit');
    });
  });

  describe('Option length is less than threshold', () => {
    it('should return "numeric" ', () => {
      const format = getFormat('2', 1);
      expect(format.style).toBe('numeric');
    });
  });
});
