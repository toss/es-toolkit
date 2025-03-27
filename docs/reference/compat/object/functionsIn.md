# functionsIn

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed @here.
:::

Creates an array of function property names from own and inherited enumerable properties of an object.

## Signature

```typescript
// When object is any type
function functionsIn(object: any): string[];
```

### Parameters

- `object`: The object to inspect.

### Returns

(`string[]`): Returns the array of function property names from both own and inherited enumerable properties of the object.

## Examples

```typescript
import { functionsIn } from 'es-toolkit/compat';

function Foo() {
  this.a = function () {
    return 'a';
  };
  this.b = function () {
    return 'b';
  };
}

Foo.prototype.c = function () {
  return 'c';
};

// Get function property names including inherited ones
functionsIn(new Foo());
// => ['a', 'b', 'c']

// Works with plain objects
const object = {
  a: function () {
    return 'a';
  },
  b: function () {
    return 'b';
  },
};

functionsIn(object);
// => ['a', 'b']

// Returns empty array for non-objects
functionsIn(null);
// => []
functionsIn(undefined);
// => []
functionsIn(1);
// => []
```
