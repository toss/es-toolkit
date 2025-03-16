# functions

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates an array of function property names from own enumerable properties of `object`.

## Signature

```typescript
function functions(object: any): string[];
```

### Parameters

- `object` (`Object`): The object to inspect.

### Returns

(`Array`): Returns the function names.

## Examples

```typescript
function Foo() {
  this.a = constant('a');
  this.b = constant('b');
}

Foo.prototype.c = constant('c');

console.log(functions(new Foo()));
// => ['a', 'b']
```
