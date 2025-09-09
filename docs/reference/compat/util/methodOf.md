# methodOf

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that invokes the method at a given path of `object` with the provided arguments.

## Signature

```typescript
function methodOf(object: object, ...args: any[]): (path: PropertyKey | PropertyKey[]) => any;
```

### Parameters

- `object` (`object`): The object to query.
- `args` (`...any`): The arguments to invoke the method with.

### Returns

(`(path: PropertyKey | PropertyKey[]) => any`): Returns a new function that takes a path and invokes the method at `path` of `object` with `args`.

## Examples

```typescript
const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

const add = methodOf(object, 1, 2);
console.log(add('a.b')); // => 3
```
