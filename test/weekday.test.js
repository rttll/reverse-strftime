const { weekday, getWeekday } = require('../lib/parsers/weekday');

describe('weekday()', () => {
  describe('Options include full weekday', () => {
    let options = [
      { type: 'alpha', value: 'Saturday' },
      { type: 'literal', value: ' ' },
      { type: 'alpha', value: 'May' },
      { type: 'literal', value: ' ' },
      { type: 'int', value: '1' },
    ];
    it('style should be long', async () => {
      let results = await weekday(options);
      expect(results[0].style).toBe('long');
    });
  });

  describe('Abbreviated weekday passed in', () => {
    let options = [
      { type: 'alpha', value: 'Sat' },
      { type: 'literal', value: '. ' },
      { type: 'alpha', value: 'May' },
      { type: 'literal', value: ' ' },
      { type: 'int', value: '1' },
    ];
    it('style should be short', async () => {
      let results = await weekday(options);
      expect(results[0].style).toBe('short');
    });
  });
});

describe('getWeekday()', () => {
  describe('Option is long weekday', () => {
    let options = [{ type: 'alpha', value: 'Saturday' }];
    test('style should be long', async () => {
      let results = await weekday(options);
      expect(results[0].style).toBe('long');
    });
  });

  describe('Option is short weekday', () => {
    let options = [
      { type: 'alpha', value: 'Sat' },
      { type: 'literal', value: '. ' },
    ];
    test('style should be long', async () => {
      let results = await weekday(options);
      expect(results[0].style).toBe('short');
    });
  });
});
