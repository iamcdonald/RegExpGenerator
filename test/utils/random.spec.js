import tape from 'tape';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const stubs = {
    random_incl: sinon.stub(),
    init_seed: sinon.stub(),
    'mersenne-twister': class MTStub {
        random_incl = stubs.random_incl;
        init_seed = stubs.init_seed;
      }
  },
  random = proxyquire('../../lib/utils/random', stubs);

tape('random', t => {

  t.test('seed calls through to init_seed', t => {
    t.plan(1);
    random.seed(12);
    t.ok(stubs.init_seed.calledWith(12), 'init_seed called with correct argument');
  });

  t.test('float gives a float within two numbers inclusive', t => {
    t.plan(7);
    stubs.random_incl.returns(0);
    t.equals(random.float(2, 10), 2);
    t.equals(random.float(8, 17), 8);
    stubs.random_incl.returns(1);
    t.equals(random.float(2, 10), 10);
    t.equals(random.float(8, 17), 17);
    stubs.random_incl.returns(0.45);
    t.equals(random.float(2, 10), 5.6);
    t.equals(random.float(2, 17), 8.75);
    stubs.random_incl.returns(0.67);
    t.equals(random.float(1, 1023), 685.74);
  });

  t.test('int gives a rounded int within two numbers inclusive', t => {
    t.plan(8);
    stubs.random_incl.returns(0);
    t.equals(random.int(2.4, 10), 2);
    t.equals(random.int(8, 17), 8);
    stubs.random_incl.returns(1);
    t.equals(random.int(2, 10), 10);
    t.equals(random.int(8, 17.6), 18);
    stubs.random_incl.returns(0.45);
    t.equals(random.int(2, 10), 6);
    t.equals(random.int(2, 16), 8);
    stubs.random_incl.returns(0.67);
    t.equals(random.int(1, 1023), 686);
    stubs.random_incl.returns(0.501);
    t.equals(random.int(1, 2), 2);
  });

})
