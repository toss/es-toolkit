import { describe, it, expect } from 'vitest';
import { promisify } from './promisify';

describe('promisify', () => {
  it('resolves with value', async () => {
    const fn = (cb: (err: Error | null, val: number) => void) => cb(null, 42);
    await expect(promisify(fn)()).resolves.toBe(42);
  });

  it('rejects with error', async () => {
    const err = new Error('Fail');
    const fn = (cb: (err: Error | null, val: string) => void) => cb(err, '');
    await expect(promisify(fn)()).rejects.toThrow(err);
  });

  it('preserves context with options', async () => {
    const obj = {
      val: 10,
      run(cb: (err: Error | null, val: number) => void) {
        cb(null, this.val);
      },
    };
    await expect(promisify(obj.run, { context: obj })()).resolves.toBe(10);
  });

  it('passes arguments correctly', async () => {
    const fn = (a: number, b: number, cb: (err: Error | null, val: number) => void) => {
      cb(null, a + b);
    };
    await expect(promisify(fn)(5, 3)).resolves.toBe(8);
  });

  it('works with void callback', async () => {
    const fn = (msg: string, cb: (err: Error | null, val: void) => void) => {
      console.log(msg);
      cb(null, undefined);
    };
    await expect(promisify(fn)('test')).resolves.toBeUndefined();
  });

  it('works with multiple arguments', async () => {
    const fn = (a: string, b: string, c: string, cb: (err: Error | null, val: string) => void) => {
      cb(null, a + b + c);
    };
    await expect(promisify(fn)('foo', 'bar', 'baz')).resolves.toBe('foobarbaz');
  });
});
