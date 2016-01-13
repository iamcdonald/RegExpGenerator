import RegExpGenerator from '../lib/RegExpGenerator';
import tape from 'tape';

const sanitizeRegExpForTest = regex => {
  if (regex[0] !== '^') {
    regex = `^${regex}`;
  }
  if (regex[regex.length - 1] !== '$') {
    regex = `${regex}$`;
  }
  return new RegExp(regex);
}

tape.only('RegExpGenerator', t => {

  t.test('setup', t => {

    t.test('throws an error if given bad regex', t => {
      t.plan(2)
      t.throws(() => new RegExpGenerator('(afg\\'), SyntaxError);
      t.throws(() => new RegExpGenerator('a**f-w\\'), SyntaxError);
    });
  });

  t.test('literals', t => {

    t.test('handles literals', t => {
      t.plan(1);
      const regex = new RegExp('afg'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles forced literals \\\\', t => {
      t.plan(1);
      const regex = new RegExp('af\\?g'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });
  });

  t.test('handles start and end tokens', t => {
    t.plan(1);
    const regex = new RegExp('^afgafg$'),
      generator = new RegExpGenerator(regex),
      result = generator.gen();
    t.ok(regex.test(result), `${result} matches ${regex}`);
  });

  t.test('quantifiers', t => {

    t.test('handles + quantifier', t => {
      t.plan(1);
      const regex = new RegExp('afg+'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles +? quantifier (lazy)', t => {
      t.plan(1);
      const regex = new RegExp('afg+?'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles * quantifier', t => {
      t.plan(1);
      const regex = new RegExp('af*g'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles *? quantifier (lazy)', t => {
      t.plan(1);
      const regex = new RegExp('af*?g'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles ? quantifier', t => {
      t.plan(1);
      const regex = new RegExp('a?fg'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles ?? quantifier (lazy)', t => {
      t.plan(1);
      const regex = new RegExp('a??fg'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles {x} quantifier', t => {
      t.plan(1);
      const regex = new RegExp('a{3}fg'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles {x}? quantifier (lazy)', t => {
      t.plan(1);
      const regex = new RegExp('a{3}?fg'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles {x,} quantifier', t => {
      t.plan(1);
      const regex = new RegExp('a{2,}fg'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles {x,}? quantifier (lazy)', t => {
      t.plan(1);
      const regex = new RegExp('a{4,}?fg'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles {x,y} quantifier', t => {
      t.plan(1);
      const regex = new RegExp('a{2,12}fg'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles {x,y}? quantifier (lazy)', t => {
      t.plan(1);
      const regex = new RegExp('a{4,12}?fg'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });
  });

  t.test('character class', t => {

    t.test('handles character class', t => {
      t.plan(1);
      const regex = new RegExp('[af09.okg]'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles character class with quantifier', t => {
      t.plan(1);
      const regex = new RegExp('[af24t?\\]Tj0]+'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles negated character class with quantifier', t => {
      t.plan(1);
      const regex = new RegExp('[^afj09okg]+'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });
  });

  t.test('groups', t => {

    t.test('handles group class',  t => {
      t.plan(1);
      const regex = new RegExp('(a+sdf?)'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles group class with quantifier',  t => {
      t.plan(1);
      const regex = new RegExp('(a+sdf?){2,3}'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles group class - non-capture', t => {
      t.plan(1);
      const regex = new RegExp('w(?:ai?ters?)'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('handles group class - non-capture with quantifier', t => {
      t.plan(1);
      const regex = new RegExp('w(?:ai?ters?){3,}'),
        generator = new RegExpGenerator(regex),
        result = generator.gen();
      t.ok(regex.test(result), `${result} matches ${regex}`);
    });

    t.test('throws no support error for positive lookahead groups', t => {
      t.plan(1);
      t.throws(() => new RegExpGenerator(/w(?=ater)s/), Error);
    });

    t.test('throws no support error for negative lookahead groups', t => {
      t.plan(1);
      t.throws(() => new RegExpGenerator(/w(?!ater)s/), Error);
    });

  });

});
