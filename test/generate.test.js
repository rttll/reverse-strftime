const generate = require('../lib/commands/generate');

describe('generate()', () => {
  describe('Custom date string', () => {
    it('returns strftime directives', async () => {
      let date = ['Mon.', 'June', '1,', '3030'],
        locale = 'en-US';
      let resp = await generate(date, { locale });
      expect(resp.string).toBe('%a. %B %e, %Y');
    });
    it('handles strange punctuation', async () => {
      let date = ['Mon..', 'June,,,', '1,', '4040'],
        locale = 'en-US';
      let resp = await generate(date, { locale });
      expect(resp.string).toBe('%a.. %B,,, %e, %Y');
    });
    describe('with slashes', () => {
      it('returns slashes', async () => {
        let date = ['Monday', '01/01/3030'],
          locale = 'en-US';
        let resp = await generate(date, { locale });
        expect(resp.string).toBe('%A %m/%d/%Y');
      });
    });
    describe('locale is en-GB', () => {
      it('returns directives in correct order', async () => {
        let date = ['Monday', '1', 'June,', '30'],
          locale = 'en-GB';
        let resp = await generate(date, { locale });
        expect(resp.string).toBe('%A %e %B, %y');
      });
    });
  });
  describe('With auto flag', () => {
    it('Returns full date directives', async () => {
      let resp = await generate([], { auto: true });
      expect(resp.string).toBe('%A, %B %e, %Y');
    });
    describe('locale is en-GB', () => {
      it('returns directives in correct order', async () => {
        let resp = await generate([], { auto: true, locale: 'en-GB' });
        expect(resp.string).toBe('%A, %e %B %Y');
      });
    });
  });
});
