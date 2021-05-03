const getTime = require('../lib/parsers/time');

describe('time()', () => {
  // 1pm
  // 01pm
  // 1:01:34 pm
  // 13:02:13

  // let input = strftime 4/4/4444 5:30 PM
  // # ➜ %m/%e/%Y %l:%M%P

  // strftime Monday 5pm
  // # ➜ %A %mp%l %p

  let components;

  beforeEach(() => {
    components = {
      weekday: null,
      month: null,
      day: null,
      year: null,
      hour: null,
      minute: null,
      second: null,
      meridian: null,
    };
  });

  describe('With input Monday 5pm', () => {
    let input = 'Monday 5pm';
    it('hour directive should be %l', async () => {
      let time = await getTime(input.split(' '), components);
      expect(components.hour.directive).toBe('%l');
    });
  });

  describe('With input 4/4/4444 5:30', () => {
    let input = '4/4/4444 5:30';
    it('hour directive should be %l', async () => {
      let time = await getTime(input.split(' '), components);
      expect(components.hour.directive).toBe('%l');
    });

    it('punctuation should be :', async () => {
      let time = await getTime(input.split(' '), components);
      expect(components.hour.punctuation).toBe(':');
    });
  });

  describe('With meridian', () => {
    describe('with space', () => {
      let input = '4/4/4444 5:30 PM';
      it('meridian.before should be space ', async () => {
        let time = await getTime(input.split(' '), components);
        expect(components.meridian.before).toBe(' ');
      });
    });

    describe('without space', () => {
      let input = '4/4/4444 5:30am';
      it('meridian.before should be undefined ', async () => {
        let time = await getTime(input.split(' '), components);
        expect(components.meridian.before).toBe(undefined);
      });
    });

    describe('Uppercase', () => {
      let input = '4/4/4444 5:30 AM';
      it('meridian.before should be space ', async () => {
        let time = await getTime(input.split(' '), components);
        expect(components.meridian.directive).toBe('%p');
      });
    });

    describe('Lowercase', () => {
      let input = 'Monday 5:30 am';
      it('meridian.before should be space ', async () => {
        let time = await getTime(input.split(' '), components);
        expect(components.meridian.directive).toBe('%P');
      });
    });
  });

  // '24-numeric': 'k',
  //   '24-2-digit': 'H',
  //   '12-numeric': 'l',
  //   '12-2-digit': 'I',

  describe('hour is double digit integer', () => {
    // 24 hour. padded
    describe('is above 12', () => {
      // TODO: how to test w/ prompt?

      // it('should return 00 padded 24-hour time', async () => {
      //   const options = 'Mon. Jan 1, 2044 14:40:45';
      //   let time = await getTime(options.split(' '), true);
      //   expect(time.hour.directive).toBe('%H');
      //   // getTime(options.split(' '))
      //   //   .then((time) => {})
      //   //   .catch(console.error);
      // });
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
