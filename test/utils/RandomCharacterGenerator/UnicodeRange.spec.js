import UnicodeRange from '../../../lib/utils/RandomCharacterGenerator/UnicodeRange';
import tape from 'tape';

tape('UnicodeRange', t => {

  t.test('constructor', t => {

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
      let ur = new UnicodeRange('E', 'Z');
      let clone = ur.clone();
      t.deepEqual(ur, clone);
      t.notEqual(ur, clone);
    });
  })
});
