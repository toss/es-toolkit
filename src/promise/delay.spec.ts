import { performance } from 'node:perf_hooks';
import { describe, expect, it } from "vitest";
import { delay } from './delay';

describe('delay', () => {
  it('pauses an async function for a given time', async () => {
    const start = performance.now()
    await delay(100);
    const end = performance.now()

    expect(end - start).greaterThanOrEqual(99)
  });
})