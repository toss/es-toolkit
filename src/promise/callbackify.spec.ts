import { describe, it, expect } from 'vitest';
import { callbackify } from './callbackify';

describe('callbackify', () => {
  it('calls callback on success', () =>
    new Promise<void>(done => {
      const add = async (a: number, b: number) => a + b;
      callbackify(add)(10, 5, (err, res) => {
        expect(err).toBeNull();
        expect(res).toBe(15);
        done();
      });
    }));

  it('calls callback on error', () =>
    new Promise<void>(done => {
      const fail = async (): Promise<string> => {
        throw new Error('Err');
      };
      callbackify(fail)((err, _res) => {
        expect(err).toBeInstanceOf(Error);
        expect(err?.message).toBe('Err');
        done();
      });
    }));

  it('converts non-Error rejections to Error instances', () =>
    new Promise<void>(done => {
      const fail = async (): Promise<string> => {
        throw 'string error';
      };
      callbackify(fail)((err, _res) => {
        expect(err).toBeInstanceOf(Error);
        expect(err?.message).toBe('string error');
        done();
      });
    }));

  it('preserves this context when context option is provided', () =>
    new Promise<void>(done => {
      const obj = {
        value: 42,
        async getValue(): Promise<number> {
          return this.value;
        },
      };

      const callbackified = callbackify(obj.getValue, { context: obj });
      callbackified((err, res) => {
        expect(err).toBeNull();
        expect(res).toBe(42);
        done();
      });
    }));

  it('passes multiple arguments correctly', () =>
    new Promise<void>(done => {
      const concat = async (a: string, b: string, c: string) => a + b + c;
      callbackify(concat)('foo', 'bar', 'baz', (err, res) => {
        expect(err).toBeNull();
        expect(res).toBe('foobarbaz');
        done();
      });
    }));
});
