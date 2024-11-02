# toDefaulted

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a new object based on the provided `object`, applying default values from the `sources` to ensure that no properties are left `undefined`.
It assigns default values to properties that are either `undefined` or come from `Object.prototype`.

You can provide multiple source objects to set these default values,
and they will be applied in the order they are given, from left to right.
Once a property has been set, any later values for that property will be ignored.

## Signature

```typescript
function toDefaulted<T extends object>(object: T): NonNullable<T>;
function toDefaulted<T extends object, S extends object>(object: T, source: S): NonNullable<T & S>;
function toDefaulted<T extends object, S1 extends object, S2 extends object>(
  object: T,
  source1: S1,
  source2: S2
): NonNullable<T & S1 & S2>;
function toDefaulted<T extends object, S1 extends object, S2 extends object, S3 extends object>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3
): NonNullable<T & S1 & S2 & S3>;
function toDefaulted<T extends object, S1 extends object, S2 extends object, S3 extends object, S4 extends object>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3,
  source4: S4
): NonNullable<T & S1 & S2 & S3 & S4>;
function toDefaulted<T extends object, S extends object>(object: T, ...sources: S[]): object;
function toDefaulted<T extends object, S extends object>(object: T, ...sources: S[]): object;
```

### Parameters

- `object` (`T`): The target object that will receive default values.
- `sources` (`S[]`): The object that specifies the default values to apply.

### Returns

(`object`): A new object that combines the target and default values, ensuring no properties are left undefined.

## Examples

```typescript
toDefaulted({ a: 1 }, { a: 2, b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
toDefaulted({ a: 1, b: 2 }, { b: 3 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
toDefaulted({ a: null }, { a: 1 }); // { a: null }
toDefaulted({ a: undefined }, { a: 1 }); // { a: 1 }
```
