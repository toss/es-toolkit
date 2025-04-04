# forOwn

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Iterates over own enumerable properties of an object invoking iteratee for each property. The iteratee is
invoked with three arguments: (value, key, object). Iteratee functions may exit
iteration early by explicitly returning false.

## Signature

```typescript
function forOwn<T>(
  object: T | null | undefined,
  iteratee: (value: T[keyof T], key: string, collection: T) => any
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

forOwn(new Foo(), function (value, key) {
  console.log(key);
});
// => Logs 'a' then 'b' (iteration order is not guaranteed).
```
