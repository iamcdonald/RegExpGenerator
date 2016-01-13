import unicodeRanges from '../../../lib/utils/RandomCharacterGenerator/unicodeRanges';
import UnicodeRange from '../../../lib/utils/RandomCharacterGenerator/UnicodeRange';
import UnicodeRangeSet from '../../../lib/utils/RandomCharacterGenerator/UnicodeRangeSet';
import RandomCharacterGenerator, { setDefaultAvailableRanges } from '../../../lib/utils/RandomCharacterGenerator/RandomCharacterGenerator';
import tape from 'tape';

tape('setDefaultAvailableRanges', t => {

  t.test('includes all ranges by default', t => {
    t.plan(1);
    let cr = new RandomCharacterGenerator();
    t.deepEquals(cr.availableRanges, new UnicodeRangeSet([
      new UnicodeRange(0, 2143),
      new UnicodeRange(2208, 7295),
      new UnicodeRange(7360, 12255),
      new UnicodeRange(12272, 65535)
    ]));
  });

  t.test('updates default when called', t => {
    t.plan(1);
    setDefaultAvailableRanges([
      unicodeRanges.LATIN_EXTENDED_A,
      unicodeRanges.LATIN_EXTENDED_B,
      new UnicodeRange(0x0000, 0x0010)
    ]);
    let cr = new RandomCharacterGenerator();
    t.deepEquals(cr.availableRanges, new UnicodeRangeSet([
      new UnicodeRange(0, 16),
      new UnicodeRange(256, 591)
    ]));
  });

  t.test('handles merging offsets', t => {
    t.plan(1);
    setDefaultAvailableRanges([
      unicodeRanges.LATIN_EXTENDED_A,
      new UnicodeRange('@', 'p'),
      unicodeRanges.LATIN_EXTENDED_B,
      new UnicodeRange(0x0000, 0x0040)
    ]);
    let cr = new RandomCharacterGenerator();
    t.deepEquals(cr.availableRanges, new UnicodeRangeSet([
      new UnicodeRange(0, 112),
      new UnicodeRange(256, 591)
    ]));
  });

});

tape('RandomCharacterGenerator', t => {

  const resetDefaultRanges = () => setDefaultAvailableRanges(Object.keys(unicodeRanges).map(id => unicodeRanges[id]));

  resetDefaultRanges();

  t.test('availableRanges', t => {

    t.test('returns default available ranges if none provided', t => {
      t.plan(1);
      let cr = new RandomCharacterGenerator();
      t.deepEquals(cr.availableRanges, new UnicodeRangeSet([
        new UnicodeRange(0, 2143),
        new UnicodeRange(2208, 7295),
        new UnicodeRange(7360, 12255),
        new UnicodeRange(12272, 65535)
      ]));
    });

    t.test('reflects updates to defaults after creation', t => {
      t.plan(1);
      let cr = new RandomCharacterGenerator();
      setDefaultAvailableRanges([new UnicodeRange(100, 1000)])
      t.deepEquals(cr.availableRanges, new UnicodeRangeSet([
        new UnicodeRange(100, 1000)
      ]));
    });

    t.test('returns instance specific range if given one', t => {
      t.plan(1);
      let cr = new RandomCharacterGenerator();
      cr.setAvailableRanges([
        new UnicodeRange(93, 98),
        new UnicodeRange('\u0060', '\u0070')
      ]);
      t.deepEquals(cr.availableRanges, new UnicodeRangeSet([
        new UnicodeRange(93, 112)
      ]));
    });

  });

  t.test('getCharacter', t => {

    resetDefaultRanges();

    t.test('returns character within default range', t => {
      t.plan(1);
      let cr = new RandomCharacterGenerator(),
        regex = /[\u0000-\uFFFF]/,
        char = cr.getCharacter();
      t.ok(/[\u0000-\uFFFF]/.test(char), `${char} is in the range ${regex}`);
    });

    t.test('returns character within instance range if one exists', t => {
      t.plan(1);
      let cr = new RandomCharacterGenerator();
      cr.setAvailableRanges([
        new UnicodeRange('\u0040', '\u0054'),
        new UnicodeRange(0x0069, 0x0077)
      ]);
      let char = cr.getCharacter(),
        regex = /[\u0040-\u0054\u0069-\u0077]/;
      t.ok(regex.test(char), `${char} is in the range ${regex}`);
    });
  });

  t.test('getCharacterWithExclusions', t => {
    t.test('returns character within range but exluding those ranges given', t => {
      t.plan(2);
      let cr = new RandomCharacterGenerator(),
        char,
        regex;
      cr.setAvailableRanges([new UnicodeRange(0x0021, 0x0039), new UnicodeRange(0x0041, 0x005A)]);
      char = cr.getCharacterWithExclusions([new UnicodeRange(' ', '3'), new UnicodeRange('E', 'W')]);
      regex = /[4-9A-DX-Z]/;
      t.ok(regex.test(char), `${char} is in the range ${regex}`);
      regex = /[Y-Z]/;
      char = cr.getCharacterWithExclusions([new UnicodeRange(' ', 'X')]);
      t.ok(regex.test(char), `${char} is in the range ${regex}`);
    });
  });

  t.test('getCharacterFromRanges', t => {
    t.test('returns character within given ranges', t => {
      t.plan(2);
      let cr = new RandomCharacterGenerator(),
        char,
        regex;
      cr.setAvailableRanges([new UnicodeRange(0x0021, 0x0039), new UnicodeRange(0x0041, 0x005A)]);
      char = cr.getCharacterFromRanges([new UnicodeRange(' ', '3'), new UnicodeRange('E', 'W')]);
      regex = /[ -3E-W]/;
      t.ok(regex.test(char), `${char} is in the range ${regex}`);
      regex = /[ -Z]/;
      char = cr.getCharacterFromRanges(new UnicodeRange(' ', 'X'));
      t.ok(regex.test(char), `${char} is in the range ${regex}`);
    })
  });

});
