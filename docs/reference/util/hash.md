# hash

Hashes any value into a stable 43-character string.

```typescript
const hashed = hash(value);
```

## Usage

### `hash(value)`

Use `hash` when you need a short, stable identifier for a value, such as a cache key or a change detection token. The value is first serialized with [`serialize`](./serialize.md), so two values with the same structure always hash to the same string regardless of key insertion order, and then digested with SHA-256 and encoded in Base64URL format.

`hash` is only available through the dedicated `es-toolkit/util/hash` entrypoint. It is never reachable from the main entrypoints, so it adds nothing to your bundle unless you import it explicitly.

```typescript
import { hash } from 'es-toolkit/util/hash';

hash({ b: 2, a: 1 }) === hash({ a: 1, b: 2 });
// Returns true

hash([1, 2, 3]);
// Returns 'phXuruId5Red4IDejDBSyNqQEThAa6ccOMAyhF99VPQ'

hash(new Set([3, 1, 2])) === hash(new Set([1, 2, 3]));
// Returns true

hash({ a: 1 }) === hash({ a: 2 });
// Returns false
```

In Node.js, `hash` uses the native `node:crypto` implementation and requires Node.js 20.12 or later. In browsers and edge runtimes, a pure JavaScript SHA-256 implementation with byte-identical output is used, so hashes are stable across platforms.

Values that cannot be serialized, such as `Promise`, `WeakMap`, or `Blob`, throw a `TypeError`.

```typescript
hash(new WeakMap());
// Throws TypeError: Cannot serialize WeakMap
```

::: warning Not designed for security purposes

`hash` is built for cache keys and change detection. The serialization format does not escape strings or keys, so intentional collisions can be crafted from user input. Do not use it for passwords, signatures, or any security-sensitive purpose.

:::

#### Parameters

- `value` (`unknown`): The value to hash.

#### Returns

(`string`): The 43-character Base64URL-encoded SHA-256 hash of the serialized value.

#### Throws

(`TypeError`): If the value contains an object that cannot be serialized.
