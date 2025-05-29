# defaultsDeep

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Similar to the [defaults](./defaults.md) function but recursively assigns default values to nested objects.

> Note: This function modifies the first parameter `object`.

## Signature

```typescript
function defaultsDeep<T extends object>(object: T): NonNullable<T>;
function defaultsDeep<T extends object, S extends object>(object: T, source: S): NonNullable<T & S>;
function defaultsDeep<T extends object, S1 extends object, S2 extends object>(
  object: T,
  source1: S1,
  source2: S2
): NonNullable<T & S1 & S2>;
function defaultsDeep<T extends object, S extends object>(object: T, ...sources: S[]): object;
```

### Parameters

- `object` (`T`): The target object that will receive default values.
- `sources` (`S[]`): One or more source objects that provide default values.

### Returns

(`object`): The target object with default values applied.

## Examples

```typescript
// Basic usage
defaultsDeep({ a: 1 }, { a: 2, b: 2 }); // { a: 1, b: 2 }

// Nested object merging
defaultsDeep({ a: { b: 2 } }, { a: { b: 3, c: 3 }, d: 4 });
// { a: { b: 2, c: 3 }, d: 4 }

// Null values are not overwritten
defaultsDeep({ a: { b: null } }, { a: { b: 2 } }); // { a: { b: null } }

// Undefined values are overwritten
defaultsDeep({ a: { b: undefined } }, { a: { b: 2 } }); // { a: { b: 2 } }

// Using multiple source objects
defaultsDeep({ a: { b: 2 } }, { a: { c: 3 } }, { d: 4 });
// { a: { b: 2, c: 3 }, d: 4 }

// Handling circular references
const obj1 = { foo: { b: { c: { d: {} } } }, bar: { a: 2 } };
const obj2 = { foo: { b: { c: { d: {} } } }, bar: {} };
obj1.foo.b.c.d = obj1; // Creating circular reference
obj2.foo.b.c.d = obj2; // Creating circular reference
obj2.bar.b = obj2.foo.b; // Cross-reference
const result = defaultsDeep(obj1, obj2);
// Circular references and reference structures are correctly maintained
```
