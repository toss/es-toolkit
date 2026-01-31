import { describe, it, expect } from 'vitest';
import { withCallback } from './withCallback';

describe('withCallback', () => {
  const add = async (a: number, b: number): Promise<number> => a + b;
  const dualAdd = withCallback(add);

  it('works as promise', async () => {
    await expect(dualAdd(1, 2)).resolves.toBe(3);
  });

  it('works as callback', () =>
    new Promise<void>(done => {
      dualAdd(1, 2, (err, res) => {
        expect(err).toBeNull();
        expect(res).toBe(3);
        done();
      });
    }));

  it('handles errors in promise mode', async () => {
    const fail = async (): Promise<string> => {
      throw new Error('test error');
    };
    const dualFail = withCallback(fail);
    await expect(dualFail()).rejects.toThrow('test error');
  });

  it('handles errors in callback mode', () =>
    new Promise<void>(done => {
      const fail = async (): Promise<string> => {
        throw new Error('test error');
      };
      const dualFail = withCallback(fail);
      dualFail((err, _res) => {
        expect(err).toBeInstanceOf(Error);
        expect(err?.message).toBe('test error');
        done();
      });
    }));

  it('preserves this context', () =>
    new Promise<void>(done => {
      const obj = {
        value: 42,
        getValue: withCallback(async function (this: { value: number }): Promise<number> {
          return this.value;
        }),
      };

      obj.getValue((err, res) => {
        expect(err).toBeNull();
        expect(res).toBe(42);
        done();
      });
    }));

  it('works with no arguments in promise mode', async () => {
    const noArgs = async (): Promise<string> => 'hello';
    const dualNoArgs = withCallback(noArgs);
    await expect(dualNoArgs()).resolves.toBe('hello');
  });

  it('works with no arguments in callback mode', () =>
    new Promise<void>(done => {
      const noArgs = async (): Promise<string> => 'hello';
      const dualNoArgs = withCallback(noArgs);
      dualNoArgs((err, res) => {
        expect(err).toBeNull();
        expect(res).toBe('hello');
        done();
      });
    }));
});
