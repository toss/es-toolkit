# conformsTo

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if `object` conforms to `source` by invoking the predicate properties of `source` with the corresponding property values of `object`.

Note: This method is equivalent to `conforms` when source is partially applied.

## Signature

```typescript
function conformsTo(target: Record<PropertyKey, any>, source: Record<PropertyKey, (value: any) => boolean>): boolean;
```

### Parameters

- `target` (`Record<PropertyKey, any>`): The object to inspect.
- `source` (`Record<PropertyKey, (value: any) => boolean>`): The object of property predicates to conform to.

### Returns

(`boolean`): Returns `true` if `object` conforms, else `false`.

## Examples

```typescript
const object = { a: 1, b: 2 };
const source = {
  a: n => n > 0,
  b: n => n > 1,
};

console.log(conformsTo(object, source)); // => true

const source2 = {
  a: n => n > 1,
  b: n => n > 1,
};

console.log(conformsTo(object, source2)); // => false
```
