# assignIn

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Assigns the property values from the `source` object to the `object` object. It also includes properties inherited from the prototype chain.

Properties that have the same value in both `source` and `object` will not be overwritten.

## Signature

```typescript
function assignIn<O, S>(object: O, source: S): O & S;
function assignIn<O, S1, S2>(object: O, source1: S1, source2: S2): O & S1 & S2;
function assignIn<O, S1, S2, S3>(object: O, source1: S1, source2: S2, source3: S3): O & S1 & S2 & S3;
function assignIn<O, S1, S2, S3, S4>(object: O, source1: S1, source2: S2, source3: S3, source4: S4): O & S1 & S2 & S3;
function assignIn(object: any, ...sources: any[]): any;
```

### Parameters

- `object` (`any`): The target object to which properties will be assigned.
- `sources` (`...any[]`): The source objects whose properties will be assigned to the target object.

### Returns

(`any`): The updated target object with properties from the source objects assigned.

## Examples

```typescript
const target = { a: 1 };
const result = assignIn(target, { b: 2 }, { c: 3 });
console.log(result); // Output: { a: 1, b: 2, c: 3 }
```
