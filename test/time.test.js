const getTime = require('../lib/parsers/time');

describe('time()', () => {
  // 1pm
  // 01pm
  // 1:01:34 pm
  // 13:02:13
  describe('Is double digit integer', () => {
    describe('is above 12', () => {
      it('should return 00 padded 24-hour time', () => {
        const options = 'Mon. Jan 1, 2044 4:40:45 PM';
        // getTime(options.split(' '))
        //   .then((time) => {})
        //   .catch(console.error);
      });
      it.todo('should return H 00.23');
      it.todo('should return k 0..23');
    });
    describe('is below 13', () => {
      it.todo('should return I 12 hour 2-digits');
      it.todo('should return l 12 hour 1 dig');
    });

    // %M Min
    // %S min
    // %Z time zone
  });
});
