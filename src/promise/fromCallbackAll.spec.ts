import { describe, it, expect } from 'vitest';
import { fromCallbackAll } from './fromCallbackAll';

describe('fromCallbackAll', () => {
  it('creates Async methods from callback-style methods', async () => {
    const api = {
      echo(msg: string, cb: (err: Error | null, result: string) => void) {
        cb(null, msg);
      },
    };
    const asyncApi = fromCallbackAll(api);
    await expect(asyncApi.echoAsync('hello')).resolves.toBe('hello');
  });

  it('preserves original methods', async () => {
    const api = {
      echo(msg: string, cb: (err: Error | null, result: string) => void) {
        cb(null, msg);
      },
    };
    const asyncApi = fromCallbackAll(api);

    // Original callback method still works
    await new Promise<void>(done => {
      asyncApi.echo('test', (err, result) => {
        expect(result).toBe('test');
        done();
      });
    });
  });

  it('handles errors correctly', async () => {
    const api = {
      fail(cb: (err: Error | null, result: string) => void) {
        cb(new Error('test error'), '');
      },
    };
    const asyncApi = fromCallbackAll(api);
    await expect(asyncApi.failAsync()).rejects.toThrow('test error');
  });

  it('respects exclude option', () => {
    const api = {
      included(cb: (err: Error | null, result: string) => void) {
        cb(null, 'included');
      },
      excluded(cb: (err: Error | null, result: string) => void) {
        cb(null, 'excluded');
      },
    };
    const asyncApi = fromCallbackAll(api, { exclude: ['excluded'] });
    expect('includedAsync' in asyncApi).toBe(true);
    expect('excludedAsync' in asyncApi).toBe(false);
  });

  it('respects include option', () => {
    const api = {
      included(cb: (err: Error | null, result: string) => void) {
        cb(null, 'included');
      },
      notIncluded(cb: (err: Error | null, result: string) => void) {
        cb(null, 'not included');
      },
    };
    const asyncApi = fromCallbackAll(api, { include: ['included'] });
    expect('includedAsync' in asyncApi).toBe(true);
    expect('notIncludedAsync' in asyncApi).toBe(false);
  });

  it('uses custom suffix', async () => {
    const api = {
      echo(msg: string, cb: (err: Error | null, result: string) => void) {
        cb(null, msg);
      },
    };
    const asyncApi = fromCallbackAll(api, { suffix: 'Promise' });
    expect('echoPromise' in asyncApi).toBe(true);
    expect('echoAsync' in asyncApi).toBe(false);
  });

  it('preserves context', async () => {
    const api = {
      value: 42,
      getValue(cb: (err: Error | null, result: number) => void) {
        cb(null, this.value);
      },
    };
    const asyncApi = fromCallbackAll(api);
    await expect(asyncApi.getValueAsync()).resolves.toBe(42);
  });

  it('works with multiple arguments', async () => {
    const api = {
      add(a: number, b: number, cb: (err: Error | null, result: number) => void) {
        cb(null, a + b);
      },
    };
    const asyncApi = fromCallbackAll(api);
    await expect(asyncApi.addAsync(5, 3)).resolves.toBe(8);
  });
});
