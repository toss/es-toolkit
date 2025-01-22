# toPlainObject

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Converts value to a plain object flattening inherited enumerable string keyed properties of value to own properties of the plain object.

## Signature

```typescript
function toPlainObject(value: any): Record<string, any>;
```

### Parameters

- `value` (`any`): The value to convert.

### Returns

(`Record<string, any>`): Returns the converted plain object.

## Examples

```typescript
function Foo() {
  this.b = 2;
}
Foo.prototype.c = 3;

toPlainObject(new Foo()); // => { 'b': 2, 'c': 3 }
```
