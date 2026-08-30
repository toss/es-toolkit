# hash

Hashes a value into a 43-character string.

```typescript
const hashed = hash(value);
```

## Usage

### `hash(value)`

Use `hash` when you need a short, stable identifier for a value, such as a cache key or a change detection token. The value is serialized with [`serialize`](./serialize.md), then digested with SHA-256 and encoded in Base64URL format.

Values with the same structure, like `{ a: 1, b: 2 }` and `{ b: 2, a: 1 }`, always have the same hash.

`hash` is only available through the dedicated `es-toolkit/util/hash` entrypoint. It is not reachable from the main entrypoints, so it adds nothing to your bundle unless you import it explicitly.

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

::: warning Do not use for security-sensitive purposes

`hash` is built for cache keys and change detection. For performance, the serialization format does not escape strings or keys, so malicious input can be crafted to produce hash collisions. Do not use it for passwords, signatures, or anywhere security matters.

:::

#### Parameters

- `value` (`unknown`): The value to hash.

#### Returns

(`string`): The 43-character Base64URL-encoded SHA-256 hash of the serialized value.

#### Throws

(`TypeError`): If the value contains an object that cannot be serialized.
