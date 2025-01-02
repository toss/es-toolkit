# method

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that invokes the method at `path` of a given object with the provided arguments.

## Signature

```typescript
function method(path: PropertyKey | PropertyKey[], ...args: any[]): (object?: unknown) => any;
```

### Parameters

- `path` (`PropertyKey | PropertyKey[]`): The path of the method to invoke.
- `args` (`...any`): The arguments to invoke the method with.

### Returns

(`(object?: unknown) => any`): Returns a new function that takes an object and invokes the method at `path` with `args`.

## Examples

```typescript
const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

const add = method('a.b', 1, 2);
console.log(add(object)); // => 3
```
