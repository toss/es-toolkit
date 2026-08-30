# serialize

Serializes a value into a string.

```typescript
const serialized = serialize(value);
```

## Usage

### `serialize(value)`

Use `serialize` when you want to convert a value into a string. Unlike the built-in `JSON.stringify()`, it can also serialize built-in objects like `Map`, `Set`, `Date`, and `RegExp`, as well as values like `BigInt`.

Values with the same structure, like `{ a: 1, b: 2 }` and `{ b: 2, a: 1 }`, are always serialized to the same stable string.

```typescript
import { serialize } from 'es-toolkit/util';

serialize({ b: 2, a: 1 });
// Returns "{'a':1,'b':2}"

serialize({ a: 1, b: 2 }) === serialize({ b: 2, a: 1 });
// Returns true

serialize([1, 2n, 'a', { k: 1 }]);
// Returns "[1,2n,'a',{'k':1}]"

serialize(new Set([3, 1, 2]));
// Returns 'Set[1,2,3]'

serialize(
  new Map([
    ['b', 2],
    ['a', 1],
  ])
);
// Returns "Map{'a':1,'b':2}"

serialize(new Date(0));
// Returns 'Date(1970-01-01T00:00:00.000Z)'

serialize(new Uint8Array([1, 2, 3]));
// Returns 'Uint8Array[1,2,3]'
```

Primitive types are serialized as follows.

| Type        | Input                    | Result        |
| ----------- | ------------------------ | ------------- |
| String      | `serialize('abc')`       | `"'abc'"`     |
| Number      | `serialize(123)`         | `"123"`       |
|             | `serialize(-0)`          | `"0"`         |
|             | `serialize(NaN)`         | `"NaN"`       |
|             | `serialize(Infinity)`    | `"Infinity"`  |
| Boolean     | `serialize(true)`        | `"true"`      |
| `undefined` | `serialize(undefined)`   | `"undefined"` |
| `null`      | `serialize(null)`        | `"null"`      |
| `BigInt`    | `serialize(123n)`        | `"123n"`      |
| Symbol      | `serialize(Symbol('a'))` | `"Symbol(a)"` |

Class instances are serialized with their class name. If the instance has a `toJSON` method, the result of `toJSON` is serialized instead.

```typescript
class User {
  name = 'Alice';
}
serialize(new User());
// Returns "User{'name':'Alice'}"
```

Functions are serialized as `name:source`. Newlines and their surrounding whitespace are removed from the source so that the result does not depend on code formatting. Native functions, whose source is not available, are serialized as `name:[native]`.

```typescript
function sum(a, b) {
  return a + b;
}
serialize(sum);
// Returns 'sum:function sum(a, b) {return a + b;}'

serialize(Math.max);
// Returns 'max:[native]'
```

Circular references are serialized as `#ref{n}` back-references, where `n` is the order in which the object was first visited.

```typescript
const obj = {};
obj.self = obj;
serialize(obj);
// Returns "{'self':#ref0}"
```

Objects that cannot be serialized meaningfully, such as `Promise`, `WeakMap`, or `Blob`, throw a `TypeError`.

```typescript
serialize(new WeakMap());
// Throws TypeError: Cannot serialize WeakMap
```

::: warning Do not use for security-sensitive purposes

For performance, `serialize` does not escape strings or keys. This means malicious input can be crafted so that different values serialize to the same string. Use it for general-purpose cache keys and change detection, and do not use it where security matters.

:::

#### Parameters

- `value` (`unknown`): The value to serialize.

#### Returns

(`string`): The serialized string.

#### Throws

(`TypeError`): If the value contains an object that cannot be serialized, such as `Promise`, `WeakMap`, `WeakSet`, `Blob`, or `DataView`.
