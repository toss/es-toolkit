# keysIn

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Retrieves the names of string-keyed properties from an object, including those inherited from its prototype.

- If the value is not an object, it is converted to an object.
- Array-like objects are treated like arrays.
- Sparse arrays with some missing indices are treated like dense arrays.
- If the value is `null` or `undefined`, an empty array is returned.
- When handling prototype objects, the `constructor` property is excluded from the results.

## Signature

```typescript
function keysIn(object?: unknown): string[];
```

### Parameters

- `object` (`unknown`): The object to inspect for keys.

### Returns

(`string[]`): An array of string keys from the object.

## Examples

```typescript
const obj = { a: 1, b: 2 };
console.log(keysIn(obj)); // ['a', 'b']

const arr = [1, 2, 3];
console.log(keysIn(arr)); // ['0', '1', '2']

function Foo() {}
Foo.prototype.a = 1;
console.log(keysIn(new Foo())); // ['a']
```
