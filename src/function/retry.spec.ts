import { describe, expect, it } from 'vitest';
import { retry } from './retry';

async function getNumber() {
  return Promise.resolve(3);
}

async function getError() {
  return Promise.reject(new Error('MyFailed'));
}

// Tests
describe('retry', () => {
  it('Execute successfully and return value', async () => {
    const num = await retry(getNumber, { intervalMs: 1000, retries: 3 });
    expect(num).toBe(3);
  });
  it('Retry multiple times and throw an exception', async () => {
    expect(retry(getError, { intervalMs: 1000, retries: 2 })).rejects.toThrowError(new Error('MyFailed'));
  });

  it('When retries is 0, a fallback error is triggered', async () => {
    expect(retry(getError, { intervalMs: 1000, retries: 0 })).rejects.toThrowError(new Error('Failed after maximum retries'));
  });
});
