import { describe, it, expect } from 'vitest';
import { callbackifyAll } from './callbackifyAll';

describe('callbackifyAll', () => {
  it('creates Callback methods', () =>
    new Promise<void>(done => {
      const api = {
        async echo(msg: string): Promise<string> {
          return msg;
        },
      };
      const callbackApi = callbackifyAll(api);
      callbackApi.echoCallback('hello', (err, result) => {
        expect(err).toBeNull();
        expect(result).toBe('hello');
        done();
      });
    }));

  it('preserves original async methods', async () => {
    const api = {
      async echo(msg: string): Promise<string> {
        return msg;
      },
    };
    const callbackApi = callbackifyAll(api);

    // Original async method still works
    await expect(callbackApi.echo('test')).resolves.toBe('test');
  });

  it('handles errors correctly', () =>
    new Promise<void>(done => {
      const api = {
        async fail(): Promise<string> {
          throw new Error('test error');
        },
      };
      const callbackApi = callbackifyAll(api);
      callbackApi.failCallback((err, _result) => {
        expect(err).toBeInstanceOf(Error);
        expect(err?.message).toBe('test error');
        done();
      });
    }));

  it('respects exclude option', () => {
    const api = {
      async included(): Promise<string> {
        return 'included';
      },
      async excluded(): Promise<string> {
        return 'excluded';
      },
    };
    const callbackApi = callbackifyAll(api, { exclude: ['excluded'] });
    expect('includedCallback' in callbackApi).toBe(true);
    expect('excludedCallback' in callbackApi).toBe(false);
  });

  it('respects include option', () => {
    const api = {
      async included(): Promise<string> {
        return 'included';
      },
      async notIncluded(): Promise<string> {
        return 'not included';
      },
    };
    const callbackApi = callbackifyAll(api, { include: ['included'] });
    expect('includedCallback' in callbackApi).toBe(true);
    expect('notIncludedCallback' in callbackApi).toBe(false);
  });

  it('uses custom suffix', () => {
    const api = {
      async echo(msg: string): Promise<string> {
        return msg;
      },
    };
    const callbackApi = callbackifyAll(api, { suffix: 'Cb' });
    expect('echoCb' in callbackApi).toBe(true);
    expect('echoCallback' in callbackApi).toBe(false);
  });

  it('preserves context', () =>
    new Promise<void>(done => {
      const api = {
        value: 42,
        async getValue(): Promise<number> {
          return this.value;
        },
      };
      const callbackApi = callbackifyAll(api);
      callbackApi.getValueCallback((err, result) => {
        expect(err).toBeNull();
        expect(result).toBe(42);
        done();
      });
    }));
});
