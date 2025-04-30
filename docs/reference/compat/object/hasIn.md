# hasIn

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if a given path exists in an object, including inherited properties.

You can provide the path as a single property key, an array of property keys,
or a string representing a deep path.

Unlike `has`, which only checks for own properties, `hasIn` also checks for properties
in the prototype chain.

If the path is an index and the object is an array or an arguments object,
the function will verify if the index is valid and within the bounds of the array
or arguments object, even if the array or arguments object is sparse
(i.e., not all indexes are defined).

## Signature

```typescript
function hasIn(object: unknown, path: string | number | symbol | Array<string | number | symbol>): boolean;
```

### Parameters

- `object` (`unknown`): The object to query.
- `path` (`string` or `number` or `symbol` or `Array<string | number | symbol>`): The path to check. This can be a single property key, an array of property keys, or a string representing a deep path.

### Returns

(`boolean`): Returns `true` if the path exists (own or inherited) in the object, `false` otherwise.

## Examples

```typescript
import { has, hasIn } from 'es-toolkit/compat';

const obj = { a: { b: { c: 3 } } };

hasIn(obj, 'a'); // true
hasIn(obj, ['a', 'b']); // true
hasIn(obj, ['a', 'b', 'c']); // true
hasIn(obj, 'a.b.c'); // true
hasIn(obj, 'a.b.d'); // false
hasIn(obj, ['a', 'b', 'c', 'd']); // false

// Example with inherited properties:
function Rectangle() {}
Rectangle.prototype.area = function () {};

const rect = new Rectangle();
hasIn(rect, 'area'); // true - hasIn checks both own and inherited properties
has(rect, 'area'); // false - has only checks own properties
```

## Demo

::: sandpack

```ts index.ts
import { has, hasIn } from 'es-toolkit/compat';

// Example with inherited properties
function Rectangle() {
  this.width = 10;
  this.height = 5;
}
Rectangle.prototype.area = function () {
  return this.width * this.height;
};

const rect = new Rectangle();

console.log('hasIn(rect, "area"):', hasIn(rect, 'area')); // true - checks inherited properties
console.log('has(rect, "area"):', has(rect, 'area')); // false - only checks own properties
console.log('hasIn(rect, "width"):', hasIn(rect, 'width')); // true - own property
```

:::
