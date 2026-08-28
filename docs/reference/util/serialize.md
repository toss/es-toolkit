# serialize

Serializes any value into a stable string.

```typescript
const serialized = serialize(value);
```

## Usage

### `serialize(value)`

Use `serialize` when you need a stable string representation of a value, such as for hashing, cache keys, or change detection. Two values with the same structure always serialize to the same string: plain object keys, `Map` keys, and `Set` values are sorted, so the output does not depend on insertion order.

```typescript
import { serialize } from 'es-toolkit/util';

serialize({ b: 2, a: 1 });
// Returns '{a:1,b:2}'

serialize({ a: 1, b: 2 }) === serialize({ b: 2, a: 1 });
// Returns true

serialize([1, 2n, 'a', { k: 1 }]);
// Returns "[1,2n,'a',{k:1}]"

serialize(new Set([3, 1, 2]));
// Returns 'Set[1,2,3]'

serialize(new Map([['b', 2], ['a', 1]]));
// Returns 'Map{a:1,b:2}'

serialize(new Date(0));
// Returns 'Date(1970-01-01T00:00:00.000Z)'

serialize(new Uint8Array([1, 2, 3]));
// Returns 'Uint8Array[1,2,3]'
```

Class instances are serialized with their class name. If the instance has a `toJSON` method, the serialized value comes from `toJSON`.

```typescript
class User {
  name = 'Alice';
}
serialize(new User());
// Returns "User{name:'Alice'}"
```

Circular references are serialized as `#ref{n}` back-references, where `n` is the order in which the object was first visited.

```typescript
const obj = {};
obj.self = obj;
serialize(obj);
// Returns '{self:#ref0}'
```

Objects that cannot be serialized meaningfully, such as `Promise`, `WeakMap`, or `Blob`, throw a `TypeError`.

```typescript
serialize(new WeakMap());
// Throws TypeError: Cannot serialize WeakMap
```

::: warning Not designed for security purposes

`serialize` does not escape strings or keys, so different values can intentionally be crafted to serialize to the same string. Use it for cache keys and change detection, not for anything security-sensitive.

:::

#### Parameters

- `value` (`unknown`): The value to serialize.

#### Returns

(`string`): The serialized string.

#### Throws

(`TypeError`): If the value contains an object that cannot be serialized, such as `Promise`, `WeakMap`, `WeakSet`, `Blob`, or `DataView`.
