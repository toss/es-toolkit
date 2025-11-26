# addJitter

Adds randomized jitter to a base delay duration to avoid synchronized bursts (the "thundering herd" problem).

The returned value is sampled uniformly from the interval:

```
[delay - delay * factor, delay + delay * factor]
```

and then clamped to be non‑negative (never returns a negative delay).

Use this to slightly randomize retry or polling intervals so that many clients do not all fire at exactly the same moment.

## Signature

```typescript
function addJitter(delay: number, factor?: number, rng?: () => number): number;
```

### Parameters

- `delay` (`number`): The base delay in milliseconds.
- `factor` (`number`, optional, default = `0.2`): The jitter factor in the range `[0, 1]` describing the maximum +/- proportion applied. `0` means no jitter.
- `rng` (`() => number`, optional, default = `Math.random`): A random number generator that returns a float in `[0, 1)`. Provide your own for deterministic testing.

### Returns

(`number`): A non‑negative delay with jitter applied.

## Examples

### Basic Usage

```typescript
import { addJitter } from 'es-toolkit/promise';

const base = 1000; // 1s
const value = addJitter(base); // in [800, 1200] when factor = 0.2 (default)
console.log(value);
```

### Custom Factor

```typescript
addJitter(500, 0.5); // in [250, 750]
```

### Deterministic (Inject RNG)

```typescript
// Always returns the upper bound because rng() returns 1
const upper = addJitter(100, 0.3, () => 1); // 130
// Always returns the lower bound because rng() returns 0
const lower = addJitter(100, 0.3, () => 0); // 70
```

### With Exponential Backoff

```typescript
import { addJitter } from 'es-toolkit/promise';
import { delay } from 'es-toolkit/promise';

async function fetchWithRetry(run: () => Promise<any>) {
  let base = 500;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      return await run();
    } catch (err) {
      const wait = addJitter(base); // spread concurrent retries
      await delay(wait);
      base *= 2; // exponential growth
    }
  }
  throw new Error('All retries failed');
}
```

### Periodic Polling

```typescript
async function poll(run: () => Promise<void>) {
  const base = 2000;
  const wait = addJitter(base, 0.15);
  await delay(wait);
  await run();
  // schedule next
  setTimeout(() => poll(run), addJitter(base, 0.15));
}
```

## Behavior and Notes

- Uniform distribution across the interval.
- Clamped at 0: if `factor > 1` (not recommended) or `delay` is very small, the computed value will never go below 0.
- Setting `factor` to `0` returns the original `delay`.
- Passing a custom `rng` enables reproducible tests.
