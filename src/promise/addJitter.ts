/**
 * Adds randomized jitter to a base delay duration to avoid synchronized bursts ("thundering herd").
 *
 * The returned value is sampled uniformly from the interval:
 * [delay - delay * factor, delay + delay * factor], then clamped to be non‑negative.
 * This is useful for retry / backoff strategies, scheduling polls, or any repeated
 * task where spreading concurrent executions helps reduce contention.
 *
 * @param {number} delay - The base delay in milliseconds.
 * @param {number} [factor=0.2] - The jitter factor (0–1) describing the maximum +/- proportion applied.
 * @param {() => number} [rng=Math.random] - Optional RNG returning a float in [0, 1). Inject for deterministic tests.
 * @returns {number} A (non‑negative) delay value with jitter applied.
 *
 * @example
 * // Returns a value between 800 and 1200 when delay = 1000 and factor = 0.2
 * const jittered = addJitter(1000);
 *
 * @example
 * // Using with exponential backoff
 * let base = 500;
 * for (let attempt = 0; attempt < 5; attempt++) {
 *   const wait = addJitter(base);
 *   await delay(wait);
 *   base *= 2; // exponential increase
 * }
 */
export function addJitter(delay: number, factor = 0.2, rng: () => number = Math.random) {
  const jitter = delay * factor * (rng() * 2 - 1);
  return Math.max(0, delay + jitter);
}
