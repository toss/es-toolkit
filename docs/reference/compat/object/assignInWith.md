# assignInWith

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Assigns properties from multiple source objects to a target object.
You can provide a `getValueToAssign` function to determine what value will be assigned for each property.

This function merges the properties of the source objects into the target object,
including properties from the prototype chain. If a property in the source objects
is equal to the corresponding property in the target object, it will not be overwritten.

Unlike `assignIn`, this method accepts a `getValueToAssign` function that determines
the final value to be assigned to each property in the target object. The return value
of this function will be directly assigned to the corresponding property. This allows for
more precise control over how properties are merged between objects. If not provided,
the default behavior is equivalent to using the identity function (returning the source value).

## Signature

```typescript
function assignInWith<O, S>(object: O, source: S, getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S) => any): O & S;
function assignInWith<O, S1, S2>(object: O, source1: S1, source2: S2, getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S1 | S2) => any): O & S1 & S2;
function assignInWith<O, S1, S2, S3>(object: O, source1: S1, source2: S2, source3: S3, getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S1 | S2 | S3) => any): O & S1 & S2 & S3;
function assignInWith<O, S1, S2, S3, S4>(object: O, source1: S1, source2: S2, source3: S3, source4: S4, getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S1 | S2 | S3 | S4) => any): O & S1 & S2 & S3 & S4;
function assignInWith(object: any, ...sources: any[]): any;
```

### Parameters

- `object` (`any`): The target object to which properties will be assigned.
- `sources` (`...any[]`): The source objects whose properties will be assigned to the target object.
- `getValueToAssign` (`(objValue: any, srcValue: any, key: string, object: O, source: S) => any)`): A function that determines the value to be assigned for each property. The value returned by this function will be assigned to the corresponding property.

### Returns

(`any`): The updated target object with properties from the source objects assigned.

## Examples

```typescript
const target = { a: 1 };
const result = assignInWith(target, { b: 2 }, { c: 3 }, function(objValue, srcValue) {
  return objValue === undefined ? srcValue : objValue;
});
console.log(result); // Output: { a: 1, b: 2, c: 3 }
```