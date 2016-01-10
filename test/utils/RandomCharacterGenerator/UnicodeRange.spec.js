import UnicodeRange from '../../../lib/utils/RandomCharacterGenerator/UnicodeRange';
import tape from 'tape';

tape.only('UnicodeRange', t => {

  t.test('constructor', t => {

    t.test('throws error if start is more than end', t => {
      t.plan(1);
      t.throws(() => {
        new UnicodeRange(8, 4);
      }, /start value must be smaller or equal to end value/);
    });

    t.test('handles numbers', t => {
      t.plan(1);
      let ur = new UnicodeRange(12, 0x020);
      t.deepEqual(ur, {
        start: 12,
        end: 32,
        weighting: {
          start: 0,
          end: 0
        }
      });
    });

    t.test('handles strings', t => {
      t.plan(1);
      let ur = new UnicodeRange('A', 'G');
      t.deepEqual(ur, {
        start: 'A'.codePointAt(0),
        end: 'G'.codePointAt(0),
        weighting: {
          start: 0,
          end: 0
        }
      });
    });

  });

  t.test('clone', t => {
    t.test('creates clone of instance', t => {
      t.plan(2);
      let ur = new UnicodeRange('E', 'Z'),
        clone = ur.clone();
      t.deepEqual(ur, clone);
      t.notEqual(ur, clone);
    });
  });

  t.test('toString', t => {
    t.test('returns string version of range', t => {
      t.plan(1);
      let ur = new UnicodeRange(49, 78);
      t.equal(ur.toString(), '1(U+0031) - N(U+004e)');
    });
  });

  t.test('intersect', t => {
    t.test('returns the intersection of passed range with current range', t => {
      t.plan(1);
      let ur = new UnicodeRange(12, 22),
        result = ur.intersect(new UnicodeRange(11, 20)),
        expected = new UnicodeRange(12, 20);
      t.deepEqual(result, expected);
    });

    t.test('throws error if no valid intersection exists', t => {
      t.plan(1);
      let ur = new UnicodeRange(69, 100);
      t.throws(() => {
        ur.intersect(new UnicodeRange(120, 163))
      }, /no valid intersection between E\(U\+0045\) \- d\(U\+0064\) and x\(U\+0078\) \- £\(U\+00a3\)/);
    });
  });

  t.test('subtract', t => {

    t.test('when incoming range start point is before or equal to current range start point', t => {

      t.test('and incoming range end point is equal to current range start point but smaller than current range end point', t => {
        t.plan(1);
        let ur = new UnicodeRange(40, 60),
          result = ur.subtract(new UnicodeRange(20, 40)),
          expected = [new UnicodeRange(41, 60)];
        t.deepEqual(result, expected);
      });

      t.test('and incoming range end point is larger than current range start point but smaller than current range end point', t => {
        t.plan(1);
        let ur = new UnicodeRange(40, 60),
          result = ur.subtract(new UnicodeRange(20, 46)),
          expected = [new UnicodeRange(47, 60)];
        t.deepEqual(result, expected);
      });

      t.test('and incoming range end point is equal to current range end point', t => {
        t.plan(1);
        let ur = new UnicodeRange(40, 60),
          result = ur.subtract(new UnicodeRange(20, 60));
        t.deepEqual(result, []);
      });
    });

    t.test('when incoming range start point is after current range start point', t => {
      t.test('and incoming range end point is smaller than current range end point', t => {
        t.plan(1);
        let ur = new UnicodeRange(40, 60),
          result = ur.subtract(new UnicodeRange(45, 50)),
          expected = [new UnicodeRange(40, 44), new UnicodeRange(51, 60)];
        t.deepEqual(result, expected);
      });

      t.test('and incoming range end point is equal to or larger than current range end point', t => {
        t.plan(1);
        let ur = new UnicodeRange(40, 60),
          result = ur.subtract(new UnicodeRange(47, 60)),
          expected = [new UnicodeRange(40, 46)];
        t.deepEqual(result, expected);
      });
    });

  });

});
