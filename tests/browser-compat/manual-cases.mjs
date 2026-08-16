/**
 * Hand-written cases for exports whose JSDoc has no runnable `@example`
 * (concurrency primitives, async helpers, and a few compat utilities).
 *
 * Same shape as the generated cases: `run(__ns, __assertEq)`.
 */
export const manualCases = [
  {
    id: 'manual:main/lowerFirst',
    async: false,
    run: function (__ns, __assertEq) {
      const { lowerFirst } = __ns.main;
      __assertEq(lowerFirst('Fred'), 'fred');
      __assertEq(lowerFirst('FRED'), 'fRED');
    },
  },
  {
    id: 'manual:main/deepFreeze',
    async: false,
    run: function (__ns, __assertEq) {
      const { deepFreeze } = __ns.main;
      const frozen = deepFreeze({ user: { name: 'Alex', age: 20 } });
      __assertEq(Object.isFrozen(frozen), true);
      __assertEq(Object.isFrozen(frozen.user), true);
    },
  },
  {
    id: 'manual:main/round',
    async: false,
    run: function (__ns, __assertEq) {
      const { round } = __ns.main;
      __assertEq(round(1.2345), 1);
      __assertEq(round(1.2345, 2), 1.23);
    },
  },
  {
    id: 'manual:main/assert',
    async: false,
    run: function (__ns, __assertEq) {
      const { assert } = __ns.main;
      assert(1 + 1 === 2, 'should not throw');
      __assertEq(true, true);
    },
  },
  {
    id: 'manual:main/invariant',
    async: false,
    run: function (__ns, __assertEq) {
      const { invariant } = __ns.main;
      invariant(true, 'should not throw');
      __assertEq(true, true);
    },
  },
  {
    id: 'manual:main/Mutex',
    async: true,
    run: async function (__ns, __assertEq) {
      const { Mutex } = __ns.main;
      const mutex = new Mutex();
      await mutex.acquire();
      __assertEq(mutex.isLocked, true);
      mutex.release();
      __assertEq(mutex.isLocked, false);
    },
  },
  {
    id: 'manual:main/Semaphore',
    async: true,
    run: async function (__ns, __assertEq) {
      const { Semaphore } = __ns.main;
      const semaphore = new Semaphore(2);
      await semaphore.acquire();
      await semaphore.acquire();
      __assertEq(semaphore.available, 0);
      semaphore.release();
      __assertEq(semaphore.available, 1);
      semaphore.release();
    },
  },
  {
    id: 'manual:main/filterAsync',
    async: true,
    run: async function (__ns, __assertEq) {
      const { filterAsync } = __ns.main;
      const result = await filterAsync([1, 2, 3, 4], async value => value % 2 === 0);
      __assertEq(result, [2, 4]);
    },
  },
  {
    id: 'manual:main/mapAsync',
    async: true,
    run: async function (__ns, __assertEq) {
      const { mapAsync } = __ns.main;
      const result = await mapAsync([1, 2, 3], async value => value * 2);
      __assertEq(result, [2, 4, 6]);
    },
  },
  {
    id: 'manual:main/flatMapAsync',
    async: true,
    run: async function (__ns, __assertEq) {
      const { flatMapAsync } = __ns.main;
      const result = await flatMapAsync([1, 2], async value => [value, value * 10]);
      __assertEq(result, [1, 10, 2, 20]);
    },
  },
  {
    id: 'manual:main/forEachAsync',
    async: true,
    run: async function (__ns, __assertEq) {
      const { forEachAsync } = __ns.main;
      const seen = [];
      await forEachAsync([1, 2, 3], async value => {
        seen.push(value);
      });
      __assertEq(seen, [1, 2, 3]);
    },
  },
  {
    id: 'manual:main/limitAsync',
    async: true,
    run: async function (__ns, __assertEq) {
      const { limitAsync } = __ns.main;
      const limited = limitAsync(async value => value * 2, 1);
      const results = await Promise.all([limited(1), limited(2)]);
      __assertEq(results, [2, 4]);
    },
  },
  {
    id: 'manual:main/retry',
    async: true,
    run: async function (__ns, __assertEq) {
      const { retry } = __ns.main;
      let attempts = 0;
      const result = await retry(async () => {
        attempts++;
        if (attempts < 3) {
          throw new Error('flaky');
        }
        return 'ok';
      }, 5);
      __assertEq(result, 'ok');
      __assertEq(attempts, 3);
    },
  },
  {
    id: 'manual:compat/lowerFirst',
    async: false,
    run: function (__ns, __assertEq) {
      const { lowerFirst } = __ns.compat;
      __assertEq(lowerFirst('Fred'), 'fred');
    },
  },
  {
    id: 'manual:compat/eachRight',
    async: false,
    run: function (__ns, __assertEq) {
      const { eachRight } = __ns.compat;
      const seen = [];
      eachRight([1, 2, 3], value => {
        seen.push(value);
      });
      __assertEq(seen, [3, 2, 1]);
    },
  },
  {
    id: 'manual:compat/entries',
    async: false,
    run: function (__ns, __assertEq) {
      const { entries } = __ns.compat;
      __assertEq(entries({ a: 1, b: 2 }), [
        ['a', 1],
        ['b', 2],
      ]);
    },
  },
  {
    id: 'manual:compat/entriesIn',
    async: false,
    run: function (__ns, __assertEq) {
      const { entriesIn } = __ns.compat;
      const object = Object.create({ inherited: 3 });
      object.a = 1;
      __assertEq(entriesIn(object), [
        ['a', 1],
        ['inherited', 3],
      ]);
    },
  },
  {
    id: 'manual:compat/extend',
    async: false,
    run: function (__ns, __assertEq) {
      const { extend } = __ns.compat;
      const target = { a: 1 };
      const result = extend(target, { b: 2 });
      __assertEq(result, { a: 1, b: 2 });
      __assertEq(result === target, true);
    },
  },
  {
    id: 'manual:compat/extendWith',
    async: false,
    run: function (__ns, __assertEq) {
      const { extendWith } = __ns.compat;
      const result = extendWith({ a: 1 }, { b: 2 }, objValue => objValue);
      __assertEq(result, { a: 1, b: 2 });
    },
  },
  {
    id: 'manual:compat/findKey',
    async: false,
    run: function (__ns, __assertEq) {
      const { findKey } = __ns.compat;
      __assertEq(
        findKey({ a: 1, b: 2, c: 3 }, value => value > 1),
        'b'
      );
    },
  },
  {
    id: 'manual:compat/findLastKey',
    async: false,
    run: function (__ns, __assertEq) {
      const { findLastKey } = __ns.compat;
      __assertEq(
        findLastKey({ a: 1, b: 2, c: 3 }, value => value > 1),
        'c'
      );
    },
  },
  {
    id: 'manual:compat/once',
    async: false,
    run: function (__ns, __assertEq) {
      const { once } = __ns.compat;
      let count = 0;
      const initialize = once(() => {
        count++;
        return count;
      });
      __assertEq(initialize(), 1);
      __assertEq(initialize(), 1);
      __assertEq(count, 1);
    },
  },
  {
    id: 'manual:compat/shuffle',
    async: false,
    run: function (__ns, __assertEq) {
      const { shuffle } = __ns.compat;
      const array = [1, 2, 3, 4, 5];
      const result = shuffle(array);
      __assertEq(result.length, 5);
      __assertEq(
        result.slice().sort((a, b) => a - b),
        [1, 2, 3, 4, 5]
      );
      __assertEq(result === array, false);
    },
  },
  {
    id: 'manual:compat/toPath',
    async: false,
    run: function (__ns, __assertEq) {
      const { toPath } = __ns.compat;
      __assertEq(toPath('a.b.c'), ['a', 'b', 'c']);
      __assertEq(toPath('a[0].b'), ['a', '0', 'b']);
    },
  },
  {
    id: 'manual:compat/update',
    async: false,
    run: function (__ns, __assertEq) {
      const { update } = __ns.compat;
      const object = { a: { b: 1 } };
      update(object, 'a.b', value => value + 1);
      __assertEq(object, { a: { b: 2 } });
    },
  },
  {
    id: 'manual:compat/bindAll',
    async: false,
    run: function (__ns, __assertEq) {
      const { bindAll } = __ns.compat;
      const object = {
        label: 'docs',
        click: function () {
          return 'clicked ' + this.label;
        },
      };
      bindAll(object, ['click']);
      const detached = object.click;
      __assertEq(detached(), 'clicked docs');
    },
  },
];
