# forInRight

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Iterates over an object in reverse order and invokes the `iteratee` function for each property.

Iterates over string keyed properties including inherited properties in reverse order.

The iteration is terminated early if the `iteratee` function returns `false`.

## Signature

```typescript
function forInRight<T>(object: T, iteratee?: (value: T[keyof T], key: string, collection: T) => any): T;
function forInRight<T>(
  object: T | null | undefined,
  iteratee?: (value: T[keyof T], key: string, collection: T) => any
): T | null | undefined;
```

### Parameters

- `object` (`T | null | undefined`): The object to iterate over
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`): The function invoked per iteration. Default is the `identity` function

### Returns

(`T | null | undefined`): Returns `object`

## Examples

```typescript
import { forInRight } from 'es-toolkit/compat';

function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
};

// Create an instance of Shape
const square = new Shape();

// Iterate over all enumerable properties (including inherited ones) in reverse order
forInRight(square, function (value, key) {
  console.log(key, value);
});
// Output in reverse order:
// 'move', [Function]
// 'y', 0
// 'x', 0

// The iteration is terminated early if the iteratee returns false
forInRight(square, function (value, key) {
  console.log(key, value);
  return key !== 'y'; // stop at 'y'
});
// Output:
// 'move', [Function]
// 'y', 0
```
