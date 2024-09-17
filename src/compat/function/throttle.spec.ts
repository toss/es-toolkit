import { describe, expect, it } from 'vitest';
import { throttle } from './throttle';
import { delay } from '../../promise/delay';
import { identity } from '../_internal/identity';
import { noop } from '../../function/noop';

describe('throttle', () => {
  it('should throttle a function', async () => {
    let callCount = 0;
    const throttled = throttle(() => {
      callCount++;
    }, 32);

    throttled();
    throttled();
    throttled();

    const lastCount = callCount;
    expect(callCount).toBeGreaterThan(0);

    await delay(64);

    expect(callCount > lastCount).toBe(true);
  });

  it('subsequent calls should return the result of the first call', async () => {
    const throttled = throttle(identity, 32);
    const results = [throttled('a'), throttled('b')];

    expect(results).toEqual(['a', 'a']);

    await delay(64);

    const results2 = [throttled('c'), throttled('d')];
    expect(results2[0]).not.toStrictEqual('a');
    expect(results2[0]).not.toStrictEqual(undefined);

    expect(results2[0]).not.toStrictEqual('d');
    expect(results2[0]).not.toStrictEqual(undefined);
  });

  it('should clear timeout when `func` is called', async done => {
    let callCount = 0;
    let dateCount = 0;

    const throttled = throttle(() => {
      callCount++;
    }, 32);

    throttled();
    throttled();

    await delay(64);

    expect(callCount).toBe(2);
  });

  it('should not trigger a trailing call when invoked once', async () => {
    let callCount = 0;
    const throttled = throttle(() => {
      callCount++;
    }, 32);

    throttled();
    expect(callCount).toBe(1);

    await delay(64);
    expect(callCount).toBe(1);
  });

  [0, 1].forEach(index => {
    it(`should trigger a call when invoked repeatedly${index ? ' and `leading` is `false`' : ''}`, async () => {
      let callCount = 0;
      const limit = 1000;
      const options = index ? { leading: false } : {};
      const throttled = throttle(
        () => {
          callCount++;
        },
        32,
        options
      );

      const start = +new Date();
      while (Date.now() - start < limit) {
        throttled();
      }
      const actual = callCount > 1;

      await delay(1);

      expect(actual).toBe(true);
    });

    it('should trigger a second throttled call as soon as possible', async () => {
      let callCount = 0;

      const throttled = throttle(
        () => {
          callCount++;
        },
        128,
        { leading: false }
      );

      throttled();

      await delay(192);

      expect(callCount).toBe(1);
      throttled();

      await delay(254 - 192);

      expect(callCount).toBe(1);

      await delay(384 - 254);

      expect(callCount).toBe(2);
    });

    it('should apply default options', async () => {
      let callCount = 0;
      const throttled = throttle(
        () => {
          callCount++;
        },
        32,
        {}
      );

      throttled();
      throttled();
      expect(callCount).toBe(1);

      await delay(128);

      expect(callCount).toBe(2);
    });

    it('should support a `leading` option', () => {
      const withLeading = throttle(identity, 32, { leading: true });
      expect(withLeading('a')).toBe('a');

      const withoutLeading = throttle(identity, 32, { leading: false });
      expect(withoutLeading('a')).toBe(undefined);
    });

    it('should support a `trailing` option', async () => {
      let withCount = 0;
      let withoutCount = 0;

      const withTrailing = throttle(
        value => {
          withCount++;
          return value;
        },
        64,
        { trailing: true }
      );

      const withoutTrailing = throttle(
        value => {
          withoutCount++;
          return value;
        },
        64,
        { trailing: false }
      );

      expect(withTrailing('a')).toBe('a');
      expect(withTrailing('b')).toBe('a');

      expect(withoutTrailing('a')).toBe('a');
      expect(withoutTrailing('b')).toBe('a');

      await delay(256);

      expect(withCount).toBe(2);
      expect(withoutCount).toBe(1);
    });

    it('should not update `lastCalled`, at the end of the timeout, when `trailing` is `false`', async () => {
      let callCount = 0;

      const throttled = throttle(
        () => {
          callCount++;
        },
        64,
        { trailing: false }
      );

      throttled();
      throttled();

      await delay(96);

      throttled();
      throttled();

      await delay(192 - 96);

      expect(callCount).toBeGreaterThan(1);
    });
  });

  /** @see https://github.com/lodash/lodash/blob/4.17.15/test/test.js#L22973 */
  const func = throttle;
  const isDebounce = false;
  const methodName = 'throttle';

  it(`\`_.${methodName}\` should not error for non-object \`options\` values`, () => {
    func(noop, 32, 1 as any);
    expect(true);
  });

  it(`\`_.${methodName}\` should use a default \`wait\` of \`0\``, async () => {
    let callCount = 0;
    const funced = func(() => {
      callCount++;
    });

    funced();

    await delay(32);

    funced();
    expect(callCount).toBe(isDebounce ? 1 : 2);
  });

  it(`\`_.${methodName}\` should invoke \`func\` with the correct \`this\` binding`, async done => {
    const actual: any[] = [];
    const object = {
      funced: func(function (this: any) {
        actual.push(this);
      }, 32),
    };
    const expected = [object];

    object.funced();

    await delay(64);
    expect(actual).toEqual(expected);
  });

  it(`\`_.${methodName}\` supports recursive calls`, async () => {
    const actual: any[] = [];
    const args = ['a', 'b', 'c'].map(chr => [{}, chr]);
    const expected = args.slice();
    const queue: any[] = args.slice();

    var funced = func(function (this: any, _: unknown) {
      const current = [this];
      Array.prototype.push.apply(current, arguments as any);
      actual.push(current);

      const next = queue.shift();
      if (next) {
        funced.call(next[0], next[1]);
      }
    }, 32);

    const next = queue.shift();
    funced.call(next[0], next[1]);
    expect(actual).toEqual(expected.slice(0, isDebounce ? 0 : 1));

    await delay(256);

    expect(actual).toEqual(expected.slice(0, actual.length));
  });

  it(`\`_.${methodName}\` should support cancelling delayed calls`, async () => {
    let callCount = 0;

    const funced = func(
      () => {
        callCount++;
      },
      32,
      { leading: false }
    );

    funced();
    funced.cancel();

    await delay(64);

    expect(callCount).toBe(0);
  });

  it(`\`_.${methodName}\` should reset \`lastCalled\` after cancelling`, async () => {
    let callCount = 0;

    const funced = func(() => ++callCount, 32, { leading: true });

    expect(funced()).toBe(1);
    funced.cancel();

    expect(funced()).toBe(2);
    funced();

    await delay(64);
    expect(callCount).toBe(3);
  });

  it(`\`_.${methodName}\` should support flushing delayed calls`, async () => {
    let callCount = 0;

    const funced = func(() => ++callCount, 32, { leading: false });

    funced();
    expect(funced.flush()).toBe(1);

    await delay(64);

    expect(callCount).toBe(1);
  });

  it(`\`_.${methodName}\` should noop \`cancel\` and \`flush\` when nothing is queued`, async () => {
    let callCount = 0;
    const funced = func(() => {
      callCount++;
    }, 32);

    funced.cancel();
    expect(funced.flush()).toBe(undefined);

    await delay(64);
    expect(callCount).toBe(0);
  });
});
