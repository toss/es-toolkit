import { describe, expect, it } from 'vitest';
import { now } from './now';
import { delay } from '../../promise/delay';

describe('now', () => {
  it('should return the number of milliseconds that have elapsed since the Unix epoch', async () => {
    const stamp = Number(new Date());
    const actual = now();

    expect(actual).toBeGreaterThanOrEqual(stamp);

    await delay(32);

    expect(now() > actual);
  });
});
