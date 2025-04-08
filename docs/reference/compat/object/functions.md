# functions

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates an array of property names from an object where the property values are functions.

Only checks for own properties with string keys. Inherited properties or properties with `Symbol` keys are not included.

## Signature

```typescript
function functions(object: unknown): string[];
```

### Parameters

- `object` (`unknown`): The object to inspect.

### Returns

(`string[]`): An array of function property names.

## Examples

```typescript
function Foo() {
  this.a = () => 'a';
  this.b = () => 'b';
}

Foo.prototype.c = () => 'c';

functions(new Foo());
// => ['a', 'b']
```
