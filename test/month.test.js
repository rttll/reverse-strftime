const {
  month,
  getNameMatch,
  getNumericMatch,
} = require('../lib/parsers/month');

describe('month()', () => {
  describe('Options include alpha month name', () => {
    let options;
    beforeAll(() => {
      options = [
        { type: 'alpha', value: 'Mon' },
        { type: 'literal', value: '. ' },
        { type: 'alpha', value: 'June' },
        { type: 'literal', value: ' ' },
        { type: 'int', value: '1' },
        { type: 'literal', value: ', ' },
        { type: 'int', value: '2020' },
      ];
    });

    it('should ignore 4-digit years', async () => {
      let results = await month(options);
      expect(results.length).toBe(2);
    });

    describe('Options include long month name', () => {
      it('results include long style', async () => {
        let results = await month(options);
        expect(results.filter((obj) => obj.style === 'long').length).toBe(1);
      });
    });

    describe('Options include 2 digit integer', () => {
      it('results include 2-digit style', async () => {
        let results = await month(options);
        expect(results.filter((obj) => obj.style === '2-digit').length).toBe(1);
      });
    });
    describe('Options include 2-digit year', () => {
      it('should return all possible matches, including year', async () => {
        options.pop();
        options.push({ type: 'int', value: '44' });
        let results = await month(options);
        expect(results.length).toBe(3);
      });
    });
  });

  describe('All values are 2-digit integer', () => {
    let options = [
      { type: 'alpha', value: 'Sat.' },
      { type: 'int', value: '6' },
      { type: 'literal', value: '/' },
      { type: 'int', value: '1' },
      { type: 'literal', value: '/' },
      { type: 'int', value: '55' },
    ];
    it('should return a possible match for all integers', async () => {
      let results = await month(options);
      expect(results.length).toBe(3);
    });
  });
});
