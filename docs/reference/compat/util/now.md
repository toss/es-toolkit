# now (Lodash Compatibility)

::: warning Use `Date.now()` instead

This `now` function is a simple wrapper that calls `Date.now()` and represents unnecessary abstraction.

Use the faster and more direct `Date.now()` instead.

:::

Returns the current time in milliseconds.

```typescript
const currentTime = now();
```

## Reference

### `now()`

Returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC. This is useful for time measurement and timestamp generation.

```typescript
import { now } from 'es-toolkit/compat';

// Get the current time
const currentTime = now();
console.log(currentTime); // => 1703925600000 (example)

// Measure execution time
const startTime = now();
// Some time-consuming operation
const endTime = now();
console.log(`Operation time: ${endTime - startTime}ms`);

// Use as timestamp
const timestamp = now();
const logMessage = `[${timestamp}] Operation completed`;
```

Returns the same result as `Date.now()`.

```typescript
import { now } from 'es-toolkit/compat';

console.log(now() === Date.now()); // => true (when called at the same time)
```

#### Parameters

None.

#### Returns

(`number`): Returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC to the present.
