import { describe, it, expect } from 'vitest';
import { fromCallback } from './fromCallback';

describe('fromCallback', () => {
  it('resolves with result on success', async () => {
    const result = await fromCallback<string>(cb => cb(null, 'ok'));
    expect(result).toBe('ok');
  });

  it('rejects with error on failure', async () => {
    const error = new Error('test error');
    await expect(fromCallback(cb => cb(error, null))).rejects.toThrow('test error');
  });

  it('works with async callbacks', async () => {
    const result = await fromCallback<number>(cb => {
      setTimeout(() => cb(null, 42), 10);
    });
    expect(result).toBe(42);
  });

  it('properly types the result', async () => {
    interface User {
      name: string;
      age: number;
    }
    const user = await fromCallback<User>(cb => cb(null, { name: 'John', age: 30 }));
    expect(user.name).toBe('John');
    expect(user.age).toBe(30);
  });
});
