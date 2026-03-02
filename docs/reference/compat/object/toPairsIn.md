# toPairsIn (Lodash Compatibility)

::: warning Use `Object.entries` or `for...in` loop instead

This `toPairsIn` function operates slowly due to complex logic for handling inherited properties, `Map` and `Set` processing, etc.

Use faster and more modern `Object.entries()` or a `for...in` loop if you need inherited properties.

:::

Converts an object to an array of key-value pairs, including inherited properties.

```typescript
const pairs = toPairsIn(object);
```

## Usage

### `toPairsIn(object)`

Use `toPairsIn` when you want to convert all enumerable properties of an object (including inherited properties) to an array of `[key, value]` pairs. Unlike `toPairs`, properties in the prototype chain are also included.

```typescript
import { toPairsIn } from 'es-toolkit/compat';

// Basic object conversion
const object = { a: 1, b: 2 };
toPairsIn(object);
// => [['a', 1], ['b', 2]]

// Include inherited properties
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.proto = 'property';

const child = new Parent();
child.own = 'own';
toPairsIn(child);
// => [['inherited', 'value'], ['own', 'own'], ['proto', 'property']]
```

Can also handle `Map` and `Set`.

```typescript
import { toPairsIn } from 'es-toolkit/compat';

// Map object conversion
const map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);
toPairsIn(map);
// => [['key1', 'value1'], ['key2', 'value2']]

// Set object conversion
const set = new Set([1, 2, 3]);
toPairsIn(set);
// => [[1, 1], [2, 2], [3, 3]]
```

#### Parameters

- `object` (`object`): The object, Map, or Set to convert.

#### Returns

(`Array<[string, any]>`): Returns an array of key-value pairs (including inherited properties).
