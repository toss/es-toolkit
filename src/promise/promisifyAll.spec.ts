import { describe, it, expect } from 'vitest';
import { promisifyAll } from './promisifyAll';

describe('promisifyAll', () => {
  it('creates Async methods', async () => {
    const api = {
      echo(msg: string, cb: (err: Error | null, result: string) => void) {
        cb(null, msg);
      },
    };
    const promisifiedApi = promisifyAll(api);
    await expect(promisifiedApi.echoAsync('hello')).resolves.toBe('hello');
  });

  it('preserves original methods', async () => {
    const api = {
      echo(msg: string, cb: (err: Error | null, result: string) => void) {
        cb(null, msg);
      },
    };
    const promisifiedApi = promisifyAll(api);

    // Original callback method still works
    await new Promise<void>(done => {
      promisifiedApi.echo('test', (err, result) => {
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
    const promisifiedApi = promisifyAll(api);
    await expect(promisifiedApi.failAsync()).rejects.toThrow('test error');
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
    const promisifiedApi = promisifyAll(api, { exclude: ['excluded'] });
    expect('includedAsync' in promisifiedApi).toBe(true);
    expect('excludedAsync' in promisifiedApi).toBe(false);
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
    const promisifiedApi = promisifyAll(api, { include: ['included'] });
    expect('includedAsync' in promisifiedApi).toBe(true);
    expect('notIncludedAsync' in promisifiedApi).toBe(false);
  });

  it('uses custom suffix', async () => {
    const api = {
      echo(msg: string, cb: (err: Error | null, result: string) => void) {
        cb(null, msg);
      },
    };
    const promisifiedApi = promisifyAll(api, { suffix: 'Promise' });
    expect('echoPromise' in promisifiedApi).toBe(true);
    expect('echoAsync' in promisifiedApi).toBe(false);
  });
});
