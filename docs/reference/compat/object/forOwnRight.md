# forOwnRight

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Iterates over an object's properties in reverse order and calls the `iteratee` function for each property.

It only iterates over the object's own properties, not including inherited properties or properties with `Symbol` keys.

The `iteratee` function can terminate the iteration early by returning `false`.

## Signature

```typescript
function forOwnRight<T>(
  object: T | null | undefined,
  iteratee?: (value: T[keyof T], key: string, collection: T) => any
): T | null | undefined;
```

### Parameters

- `object` (`T | null | undefined`): The object to iterate over.
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`): The function invoked per iteration. If not provided, the identity function will be used.

### Returns

(`T | null | undefined`): Returns object.

## Examples

```typescript
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

forOwnRight(new Foo(), function (value, key) {
  console.log(key);
});
// => Logs 'b' then 'a' (iteration order is not guaranteed).
```
