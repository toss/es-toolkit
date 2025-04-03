# assign

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Assigns properties from multiple source objects to a target object.

This function merges the properties of the source objects into the target object.
If a property in the source objects is equal to the corresponding property in the target object,
it will not be overwritten.

## Signature

```typescript
function assign<O, S>(object: O, source: S): O & S;
function assign<O, S1, S2>(object: O, source1: S1, source2: S2): O & S1 & S2;
function assign<O, S1, S2, S3>(object: O, source1: S1, source2: S2, source3: S3): O & S1 & S2 & S3;
function assign<O, S1, S2, S3, S4>(
  object: O,
  source1: S1,
  source2: S2,
  source3: S3,
  source4: S4
): O & S1 & S2 & S3 & S4;
function assign(object: any, ...sources: any[]): any;
function assign(object: any, ...sources: any[]): any;
```

### Parameters

- `object` (`any`): The target object to which properties will be assigned.
- `sources` (`...any[]`): The source objects whose properties will be assigned to the target object.

### Returns

(`any`): The updated target object with properties from the source objects assigned.

## Examples

```typescript
const target = { a: 1 };
const result = assign(target, { b: 2 }, { c: 3 });
console.log(result); // Output: { a: 1, b: 2, c: 3 }
```
