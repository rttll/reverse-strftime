const getStyle = require('../lib/parser/style');

describe('Returns date style', () => {
  it('should ignore punctuation', () => {
    const style = getStyle('..1990,.', 2);
    expect(style).toBe('2-digit');
  });

  describe('Option length is greater than threshold', () => {
    it('should return "2-digit" ', () => {
      const style = getStyle('1990', 2);
      expect(style).toBe('2-digit');
    });
  });

  describe('Option length is less than threshold', () => {
    it('should return "numeric" ', () => {
      const style = getStyle('2', 1);
      expect(style).toBe('numeric');
    });
  });
});
