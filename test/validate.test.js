const validate = require('../lib/parser/validate');

describe('Validate function', () => {
  describe('String contains a valid date', () => {
    it('Returns true', () => {
      const str = 'Saturday June 1, 2020';
      const validater = validate(str);
      expect(validater.valid).toBe(true);
    });
  });

  describe('String does not contain a valid date', () => {
    it('Returns false', () => {
      const strs = ['1/32/2020', 'Ju 21, 2020'];
      for (const str of strs) {
        const validater = validate(str);
        expect(validater.valid).toBe(false);
      }
    });
  });
});
