# defaults

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Assigns default values to an `object`, ensuring that certain properties do not remain `undefined`. It sets default values for properties that are either `undefined` or inherited from `Object.prototype`.

You can pass in multiple objects to define these default values, and they will be applied in order from left to right. Once a property has been assigned a value, any subsequent values for that property will be ignored.

Note: This function modifies the first argument, `object`. If you want to keep `object` unchanged, consider using [toDefaulted](./toDefaulted.md) instead.

## Signature

```typescript
function defaults<T extends object>(object: T): NonNullable<T>;
function defaults<T extends object, S extends object>(object: T, source: S): NonNullable<T & S>;
function defaults<T extends object, S1 extends object, S2 extends object>(
  object: T,
  source1: S1,
  source2: S2
): NonNullable<T & S1 & S2>;
function defaults<T extends object, S1 extends object, S2 extends object, S3 extends object>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3
): NonNullable<T & S1 & S2 & S3>;
function defaults<T extends object, S1 extends object, S2 extends object, S3 extends object, S4 extends object>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3,
  source4: S4
): NonNullable<T & S1 & S2 & S3 & S4>;
function defaults<T extends object, S extends object>(object: T, ...sources: S[]): object;
```

### Parameters

- `object` (`T`): The target object that will receive default values.
- `sources` (`S[]`): The objects that specifies the default values to apply.

### Returns

(`object`): The `object` that has been updated with default values from `sources`, ensuring that all properties are defined and none are left as `undefined`.

## Examples

```typescript
defaults({ a: 1 }, { a: 2, b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
defaults({ a: 1, b: 2 }, { b: 3 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
defaults({ a: null }, { a: 1 }); // { a: null }
defaults({ a: undefined }, { a: 1 }); // { a: 1 }
```
