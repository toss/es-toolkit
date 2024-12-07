# invoke

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Invokes the method at `path` of `object` with the given arguments.

## Signature

```typescript
function invoke(object: unknown, path: PropertyKey | PropertyKey[], args: any[]): any;
```

### Parameters

- `object` (`unknown`): The object to query.
- `path` (`PropertyKey | PropertyKey[]`): The path of the method to invoke.
- `args` (`any[]`): The arguments to invoke the method with.

### Returns

(`any`): Returns the result of the invoked method.

## Examples

```typescript
const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

invoke(object, 'a.b', [1, 2]); // => 3
invoke(object, ['a', 'b'], [1, 2]); // => 3
```
