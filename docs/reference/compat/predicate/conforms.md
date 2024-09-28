# conforms

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that invokes the predicate properties of `source` with the corresponding property values of a given object, returning `true` if all predicates return truthy, else `false`.

Note: The created function is equivalent to `conformsTo` with source partially applied.

## Signature

```typescript
function conforms(source: Record<PropertyKey, (value: any) => boolean>): (object: Record<PropertyKey, any>) => boolean;
```

### Parameters

- `source` (`Record<PropertyKey, (value: any) => boolean>`): The object of property predicates to conform to.

### Returns

(`(object: Record<PropertyKey, any>) => boolean`): Returns the new spec function.

## Examples

```typescript
const isPositive = n => n > 0;
const isEven = n => n % 2 === 0;
const predicates = { a: isPositive, b: isEven };
const conform = conforms(predicates);

console.log(conform({ a: 2, b: 4 })); // true
console.log(conform({ a: -1, b: 4 })); // false
console.log(conform({ a: 2, b: 3 })); // false
console.log(conform({ a: 0, b: 2 })); // false
```
