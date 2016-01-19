import UnicodeRange from '../../../lib/utils/RandomCharacterGenerator/UnicodeRange';
import tape from 'tape';
import proxyquire from 'proxyquire';

const stubs = {
    '../random': {
        int: () => 0
      }
  };
const { default: UnicodeRangeSet } = proxyquire('../../../lib/utils/RandomCharacterGenerator/UnicodeRangeSet', stubs);


tape('UnicodeRangeSet', t => {

  t.test('constructor', t => {

    t.test('clones array contents to ranges', t => {
      t.plan(2);
      let ranges = [new UnicodeRange(34, 44), new UnicodeRange(12, 22)],
        urs = new UnicodeRangeSet(ranges);
      t.deepEqual(urs.ranges, [ranges[1], ranges[0]]);
      t.notEqual(urs.ranges, [ranges[1], ranges[0]]);
    });

    t.test('merges ranges if possible', t => {
      t.plan(1);
      let ranges = [new UnicodeRange(12, 0x0020), new UnicodeRange(0x0019, 200)],
        urs = new UnicodeRangeSet(ranges),
        expected = new UnicodeRangeSet([new UnicodeRange(12, 200)]);
      t.deepEqual(urs, expected);
    });

    t.test('sets correct total chars in ranges', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(20, 30)]);
      t.equal(urs.totalChars, 11);
    });

    t.test('handles being passed a single range', t => {
      t.plan(1);
      t.doesNotThrow(() => new UnicodeRangeSet(new UnicodeRange(20, 30)), Error);
    });

  });

  t.test('merge', t => {

    t.test('incoming range is before existing range end', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(12, 32)]),
        expected = new UnicodeRangeSet([new UnicodeRange(8, 10), new UnicodeRange(12, 32)]);
      urs = urs.merge([new UnicodeRange(8, 10)])
      t.deepEqual(urs, expected);
    });

    t.test('incoming range covers existing range', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(12, 32)]),
        expected = new UnicodeRangeSet([new UnicodeRange(8, 40)]);
      urs = urs.merge([new UnicodeRange(8, 40)])
      t.deepEqual(urs, expected);
    });

    t.test('incoming range end matches unicode char start of existing range', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(12, 32)]),
        expected = new UnicodeRangeSet([new UnicodeRange(8, 32)]);
      urs = urs.merge([new UnicodeRange(8, 11)])
      t.deepEqual(urs, expected);
    });

    t.test('incoming range end matches start of existing range', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(12, 32)]),
        expected = new UnicodeRangeSet([new UnicodeRange(8, 32)]);
      urs = urs.merge([new UnicodeRange(8, 12)])
      t.deepEqual(urs, expected);
    });

    t.test('incoming range end overlaps start of existing range', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(12, 32)]),
        expected = new UnicodeRangeSet([new UnicodeRange(8, 32)]);
      urs = urs.merge([new UnicodeRange(8, 16)])
      t.deepEqual(urs, expected);
    });

    t.test('incoming range is within existing range', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(12, 32)]),
        expected = new UnicodeRangeSet([new UnicodeRange(12, 32)]);
      urs = urs.merge([new UnicodeRange(16, 22)])
      t.deepEqual(urs, expected);
    });

    t.test('incoming range overhangs existing range end', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(12, 32)]),
        expected = new UnicodeRangeSet([new UnicodeRange(12, 40)]);
      urs = urs.merge([new UnicodeRange(22, 40)])
      t.deepEqual(urs, expected);
    });

    t.test('incoming range start matches existing range end', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(12, 32)]),
        expected = new UnicodeRangeSet([new UnicodeRange(12, 40)]);
      urs = urs.merge([new UnicodeRange(32, 40)])
      t.deepEqual(urs, expected);
    });

    t.test('incoming range start matches unicode char after existing range end', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(12, 32)]),
        expected = new UnicodeRangeSet([new UnicodeRange(12, 40)]);
      urs = urs.merge([new UnicodeRange(33, 40)])
      t.deepEqual(urs, expected);
    });

    t.test('incoming range is after existing range end', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(12, 32)]),
        expected = new UnicodeRangeSet([new UnicodeRange(12, 32), new UnicodeRange(40, 90)]);
      urs = urs.merge([new UnicodeRange(40, 90)])
      t.deepEqual(urs, expected);
    });

    t.test('merges any overlapping ranges when out of order', t => {
      t.plan(1);
      let ranges = [new UnicodeRange(0x0019, 200), new UnicodeRange(250, 300), new UnicodeRange(12, 0x020)],
        urs = new UnicodeRangeSet(ranges),
        expected = new UnicodeRangeSet([new UnicodeRange(12, 200), new UnicodeRange(250, 300)]);
      t.deepEqual(urs, expected);
    });

    t.test('merges any consecutive ranges', t => {
      t.plan(1);
      let ranges = [new UnicodeRange(0x0019, 200), new UnicodeRange(0x0010, 0x018)],
        urs = new UnicodeRangeSet(ranges),
        expected = new UnicodeRangeSet([new UnicodeRange(0x0010, 200)]);
      t.deepEqual(urs, expected);
    });

    t.test('removes redundant ranges', t => {
      t.plan(1);
      let ranges = [new UnicodeRange(0x0032, 0x0045), new UnicodeRange(0x0019, 200)],
        urs = new UnicodeRangeSet(ranges),
        expected = new UnicodeRangeSet([new UnicodeRange(0x0019, 200)]);
      t.deepEqual(urs, expected);
    });

    t.test('complex example', t => {
      t.plan(1);
      let ranges = [new UnicodeRange(12, 0x0020), new UnicodeRange(50, 100), new UnicodeRange(120, 140)],
        urs = new UnicodeRangeSet(ranges),
        expected = new UnicodeRangeSet([new UnicodeRange(12, 100), new UnicodeRange(110, 116), new UnicodeRange(119, 140)]);
      urs = urs.merge([new UnicodeRange(124, 138), new UnicodeRange(0x0021, 49), new UnicodeRange(110, 116), new UnicodeRange(119, 119)]);
      t.deepEqual(urs, expected);
    });

    t.test('accepts UnicodeRangeSet as arg', t => {
      t.plan(1);
      let ranges = [new UnicodeRange(12, 0x0020), new UnicodeRange(50, 100), new UnicodeRange(120, 140)],
        urs = new UnicodeRangeSet(ranges),
        expected = new UnicodeRangeSet([new UnicodeRange(12, 100), new UnicodeRange(110, 116), new UnicodeRange(119, 140)]);
      urs = urs.merge(new UnicodeRangeSet([
          new UnicodeRange(124, 138),
          new UnicodeRange(0x0021, 49),
          new UnicodeRange(110, 116),
          new UnicodeRange(119, 119)
        ]));
      t.deepEqual(urs, expected);
    });

  });

  t.test('subtract', t => {

    t.test('incoming range end matches start of existing range', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(12, 0x0020)]),
        expected = new UnicodeRangeSet([new UnicodeRange(13, 0x0020)]);
      urs = urs.subtract([new UnicodeRange(2, 12)])
      t.deepEqual(urs, expected);
    });

    t.test('incoming range overlaps start of existing range', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(12, 32)]),
        expected = new UnicodeRangeSet([new UnicodeRange(15, 32)]);
      urs = urs.subtract([new UnicodeRange(2, 14)])
      t.deepEqual(urs, expected);
    });

    t.test('incoming range is within existing range', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(12, 32)]),
        expected = new UnicodeRangeSet([new UnicodeRange(12, 15), new UnicodeRange(25, 32)]);
      urs = urs.subtract([new UnicodeRange(16, 24)])
      t.deepEqual(urs, expected);
    });

    t.test('incoming range overlaps end of existing range', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(12, 32)]),
        expected = new UnicodeRangeSet([new UnicodeRange(12, 23)]);
      urs = urs.subtract([new UnicodeRange(24, 40)])
      t.deepEqual(urs, expected);
    });

    t.test('incoming range start matches end of existing range', t => {
      t.plan(1);
      let urs = new UnicodeRangeSet([new UnicodeRange(12, 32)]),
        expected = new UnicodeRangeSet([new UnicodeRange(12, 31)]);
      urs = urs.subtract([new UnicodeRange(32, 48)])
      t.deepEqual(urs, expected);
    });

    t.test('complex example', t => {
      t.plan(1);
      let ranges = [new UnicodeRange(12, 32), new UnicodeRange(50, 100), new UnicodeRange(120, 140)],
        urs = new UnicodeRangeSet(ranges),
        expected = new UnicodeRangeSet([new UnicodeRange(12, 32), new UnicodeRange(50, 89), new UnicodeRange(121, 123), new UnicodeRange(139, 140)]);
      urs = urs.subtract([new UnicodeRange(124, 138), new UnicodeRange(33, 49), new UnicodeRange(110, 120), new UnicodeRange(90, 119)])
      t.deepEqual(urs, expected);
    });

    t.test('accepts UnicodeRangeSet as arg', t => {
      t.plan(1);
      let ranges = [new UnicodeRange(12, 32), new UnicodeRange(50, 100), new UnicodeRange(120, 140)],
        urs = new UnicodeRangeSet(ranges),
        expected = new UnicodeRangeSet([new UnicodeRange(12, 32), new UnicodeRange(50, 89), new UnicodeRange(121, 123), new UnicodeRange(139, 140)]);
      urs = urs.subtract(new UnicodeRangeSet([
          new UnicodeRange(124, 138),
          new UnicodeRange(33, 49),
          new UnicodeRange(110, 120),
          new UnicodeRange(90, 119)
        ]));
      t.deepEqual(urs, expected);
    });
  });

  t.test('getRandomCharacter', t => {
    t.test('returns random character from range', t => {
      t.plan(1);
      stubs['../random'].int = () => 3;
      let urs = new UnicodeRangeSet([new UnicodeRange('A', 'F')]),
        regex = /[C]/,
        char = urs.getRandomCharacter();
      t.ok(regex.test(char), `${char} is in regex ${regex}`);
    });

    t.test('weights random range choice according to amount of chars held in each range', t => {
      t.plan(2);
      stubs['../random'].int = () => 5;
      let urs = new UnicodeRangeSet([new UnicodeRange('A', 'C'), new UnicodeRange('G', 'M')]),
        regex = /[H]/,
        char = urs.getRandomCharacter();
      t.ok(regex.test(char), `${char} is in regex ${regex}`);

      stubs['../random'].int = () => 10;
      urs =new UnicodeRangeSet([new UnicodeRange('A', 'I'), new UnicodeRange('K', 'L')]),
      regex = /[K]/,
      char = urs.getRandomCharacter();
      t.ok(regex.test(char), `${char} is in regex ${regex}`);
    });
  });
})
