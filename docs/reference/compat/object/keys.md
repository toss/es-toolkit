# keys

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates an array of the own enumerable property names of `object`.

Non-object values are coerced to objects.

## Signature

```typescript
function keys(object?: any): string[];
```

### Parameters

- `object` (`object`): The object to query.

### Returns

(`string[]`): Returns the array of property names.

## Examples

```typescript
function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;
keys(new Foo()); // ['a', 'b'] (iteration order is not guaranteed)

keys('hi'); // ['0', '1']
keys([1, 2, 3]); // ['0', '1', '2']
keys({ a: 1, b: 2 }); // ['a', 'b']
```
