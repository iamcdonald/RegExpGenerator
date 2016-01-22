import RegExpGenerator from '../lib/RegExpGenerator';
import tape from 'tape';

const testHandlesRegExp = (t, regexp) => {
  const regex = new RegExp(regexp),
    generator = new RegExpGenerator(regex),
    result = generator.gen();
  t.ok(regex.test(result), `${result} matches ${regex}`);
}

tape('RegExpGenerator', t => {

  t.test('setup', t => {

    t.test('throws an error if given bad regex', t => {
      t.plan(2);
      t.throws(() => new RegExpGenerator('(afg\\'), SyntaxError);
      t.throws(() => new RegExpGenerator('a**f-w\\'), SyntaxError);
    });
  });

  t.test('literals', t => {

    t.test('handles literals', t => {
      t.plan(1);
      testHandlesRegExp(t, 'afg');
    });

    t.test('handles forced literals \\\\', t => {
      t.plan(1);
      testHandlesRegExp(t, 'af\\?g');
    });
  });

  t.test('anchors', t => {

    t.test('throws no support error for start anchor - ^', t => {
      t.plan(1);
      t.throws(() => new RegExpGenerator(/^asd/), /NotSupportedError/);
    });

    t.test('throws no support error for end anchor - $', t => {
      t.plan(1);
      t.throws(() => new RegExpGenerator(/afgafg$/), /NotSupportedError/);
    });

    t.test('throws no support error for word boundary anchor - \\b', t => {
      t.plan(1);
      t.throws(() => new RegExpGenerator(/afg\bafg/), /NotSupportedError/);
    });

    t.test('throws no support error for non word boundary anchor - \\B', t => {
      t.plan(1);
      t.throws(() => new RegExpGenerator(/afg\Bafg/), /NotSupportedError/);
    });
  });

  t.test('quantifiers', t => {

    t.test('handles + quantifier', t => {
      t.plan(1);
      testHandlesRegExp(t, 'afg+');
    });

    t.test('handles +? quantifier (lazy)', t => {
      t.plan(1);
      testHandlesRegExp(t, 'afg+?');
    });

    t.test('handles * quantifier', t => {
      t.plan(1);
      testHandlesRegExp(t, 'af*g');
    });

    t.test('handles *? quantifier (lazy)', t => {
      t.plan(1);
      testHandlesRegExp(t, 'af*?g');
    });

    t.test('handles ? quantifier', t => {
      t.plan(1);
      testHandlesRegExp(t, 'a?fg');
    });

    t.test('handles ?? quantifier (lazy)', t => {
      t.plan(1);
      testHandlesRegExp(t, 'a??fg');
    });

    t.test('handles {x} quantifier', t => {
      t.plan(1);
      testHandlesRegExp(t, 'a{3}fg');
    });

    t.test('handles {x}? quantifier (lazy)', t => {
      t.plan(1);
      testHandlesRegExp(t, 'a{3}?fg');
    });

    t.test('handles {x,} quantifier', t => {
      t.plan(1);
      testHandlesRegExp(t, 'a{2,}fg');
    });

    t.test('handles {x,}? quantifier (lazy)', t => {
      t.plan(1);
      testHandlesRegExp(t, 'a{4,}?fg');
    });

    t.test('handles {x,y} quantifier', t => {
      t.plan(1);
      testHandlesRegExp(t, 'a{2,12}fg');
    });

    t.test('handles {x,y}? quantifier (lazy)', t => {
      t.plan(1);
      testHandlesRegExp(t, 'a{4,12}?fg');
    });
  });

  t.test('character class', t => {

    t.test('handles character class', t => {
      t.plan(1);
      testHandlesRegExp(t, '[af09.okg]');
    });

    t.test('handles character class with quantifier', t => {
      t.plan(1);
      testHandlesRegExp(t, '[af24t?\\]Tj0]+');
    });

    t.test('handles negated character class with quantifier', t => {
      t.plan(1);
      testHandlesRegExp(t, '[^afj09okg]+');
    });

    t.test('range', t => {

      t.test('handles range', t => {
        t.plan(1);
        testHandlesRegExp(t, '\w[d-m]');
      });

      t.test('handles range with quantifier', t => {
        t.plan(1);
        testHandlesRegExp(t, '\w[d-m]+');
      });

      t.test('handles negated range', t => {
        t.plan(1);
        testHandlesRegExp(t, '\w[^d-m]');
      });
      t.test('handles negated range', t => {
        t.plan(1);
        testHandlesRegExp(t, '\w[^d-m]{3,8}-100!');
      });
    });

    t.test('complex', t => {
      t.plan(1);
      testHandlesRegExp(t, '>[af\\]p-s]<>[^qwertyM-Z]{2}<')
    });

  });

  t.test('groups', t => {

    t.test('handles group',  t => {
      t.plan(1);
      testHandlesRegExp(t, '(a+sdf?)');
    });

    t.test('handles group with quantifier',  t => {
      t.plan(1);
      testHandlesRegExp(t, '(a+sdf?){2,3}');
    });

    t.test('handles non-capture group', t => {
      t.plan(1);
      testHandlesRegExp(t, 'w(?:ai?ters?)');
    });

    t.test('handles non-capture group with quantifier', t => {
      t.plan(1);
      testHandlesRegExp(t, 'w(?:ai?ters?){3,}');
    });

    t.test('throws no support error for positive lookahead groups', t => {
      t.plan(1);
      t.throws(() => new RegExpGenerator(/w(?=ater)s/), /NotSupportedError/);
    });

    t.test('throws no support error for negative lookahead groups', t => {
      t.plan(1);
      t.throws(() => new RegExpGenerator(/w(?!ater)s/), /NotSupportedError/);
    });

  });

  t.test('alternatives', t => {
    t.test('handles alternative', t => {
      t.plan(1);
      testHandlesRegExp(t, 'as|sa');
    });

    t.test('handles alternatives', t => {
      t.plan(1);
      testHandlesRegExp(t, 'as|(sa){2,3}|[0-9]{5}');
    });
  });

  t.test('meta', t => {

    t.test('handles . - any character', t => {
      t.plan(1);
      testHandlesRegExp(t, '.{2}');
    });

    t.test('handles \\s - white-space', t => {
      t.plan(1);
      testHandlesRegExp(t, '\\s+');
    });

    t.test('handles \\S - non-white-space', t => {
      t.plan(1);
      testHandlesRegExp(t, '\\S+');
    });

    t.test('handles \\w - word char', t => {
      t.plan(1);
      testHandlesRegExp(t, '\\w+');
    });

    t.test('handles \\W - non word char', t => {
      t.plan(1);
      testHandlesRegExp(t, '\\W+');
    });

    t.test('handles \\d - digit char', t => {
      t.plan(1);
      testHandlesRegExp(t, '\\d+');
    });

    t.test('handles \\D - non digit char', t => {
      t.plan(1);
      testHandlesRegExp(t, '\\D+');
    });

    t.test('handles \\D - non digit char', t => {
      t.plan(1);
      testHandlesRegExp(t, '\\D+');
    });

    t.test('handles \\t - tab char', t => {
      t.plan(1);
      testHandlesRegExp(t, '\\t+');
    });

    t.test('handles \\r - return char', t => {
      t.plan(1);
      testHandlesRegExp(t, '\\r+');
    });

    t.test('handles \\n - new line char', t => {
      t.plan(1);
      testHandlesRegExp(t, '\\n+');
    });

    t.test('handles \\u - hex char', t => {
      t.plan(1);
      testHandlesRegExp(t, '\\u0069+');
    });

    t.test('handles \\x - hex char', t => {
      t.plan(1);
      testHandlesRegExp(t, '\\x69+');
    });

    t.test('handles \\ddd - octal char', t => {
      t.plan(3);
      testHandlesRegExp(t, '\\6+');
      testHandlesRegExp(t, '\\45+');
      testHandlesRegExp(t, '\\245+');
    });
  });

});
