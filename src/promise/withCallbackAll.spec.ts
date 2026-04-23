import { describe, it, expect } from 'vitest';
import { withCallbackAll } from './withCallbackAll';

describe('withCallbackAll', () => {
  it('wraps async methods to support both Promise and callback', async () => {
    const api = {
      async echo(msg: string): Promise<string> {
        return msg;
      },
    };
    const dualApi = withCallbackAll(api);

    // Test as Promise
    await expect(dualApi.echo('hello')).resolves.toBe('hello');

    // Test as callback
    await new Promise<void>(done => {
      dualApi.echo('world', (err, result) => {
        expect(err).toBeNull();
        expect(result).toBe('world');
        done();
      });
    });
  });

  it('handles errors in Promise mode', async () => {
    const api = {
      async fail(): Promise<string> {
        throw new Error('test error');
      },
    };
    const dualApi = withCallbackAll(api);
    await expect(dualApi.fail()).rejects.toThrow('test error');
  });

  it('handles errors in callback mode', () =>
    new Promise<void>(done => {
      const api = {
        async fail(): Promise<string> {
          throw new Error('test error');
        },
      };
      const dualApi = withCallbackAll(api);
      dualApi.fail((err, _result) => {
        expect(err).toBeInstanceOf(Error);
        expect(err?.message).toBe('test error');
        done();
      });
    }));

  it('respects exclude option', async () => {
    const api = {
      async included(): Promise<string> {
        return 'included';
      },
      async excluded(): Promise<string> {
        return 'excluded';
      },
    };
    const dualApi = withCallbackAll(api, { exclude: ['excluded'] });

    // included should work with callback
    await new Promise<void>(done => {
      dualApi.included((err, result) => {
        expect(result).toBe('included');
        done();
      });
    });

    // excluded should only work as Promise (no callback support)
    await expect(dualApi.excluded()).resolves.toBe('excluded');
  });

  it('respects include option', async () => {
    const api = {
      async included(): Promise<string> {
        return 'included';
      },
      async notIncluded(): Promise<string> {
        return 'not included';
      },
    };
    const dualApi = withCallbackAll(api, { include: ['included'] });

    // included should work with callback
    await new Promise<void>(done => {
      dualApi.included((err, result) => {
        expect(result).toBe('included');
        done();
      });
    });
  });

  it('preserves context', async () => {
    const api = {
      value: 42,
      async getValue(): Promise<number> {
        return this.value;
      },
    };
    const dualApi = withCallbackAll(api);

    await new Promise<void>(done => {
      dualApi.getValue((err, result) => {
        expect(err).toBeNull();
        expect(result).toBe(42);
        done();
      });
    });
  });

  it('works with multiple arguments', async () => {
    const api = {
      async add(a: number, b: number): Promise<number> {
        return a + b;
      },
    };
    const dualApi = withCallbackAll(api);

    await new Promise<void>(done => {
      dualApi.add(5, 3, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBe(8);
        done();
      });
    });
  });
});
