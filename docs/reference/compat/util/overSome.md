# overSome

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that checks if any of the given predicates return truthy for the provided values.

This function takes multiple predicates, which can either be individual predicate functions or arrays of predicates,
and returns a new function that checks if any of the predicates return truthy when called with the provided values.

## Signature

```typescript
function overSome<T, U extends T, V extends T>(
  predicate1: (value: T) => value is U,
  predicate2: (value: T) => value is V
): (value: T) => value is U | V;
function overSome<T>(
  ...predicates: Array<((...values: T[]) => boolean) | ReadonlyArray<(...values: T[]) => boolean>>
): (...values: T[]) => boolean;
```

### Parameters

- `predicates` (`...Array<((...values: T[]) => boolean) | ReadonlyArray<(...values: T[]) => boolean>>`): -
  A list of predicates or arrays of predicates. Each predicate is a function that takes one or more values of
  type `T` and returns a boolean indicating whether the condition is satisfied for those values.

### Returns

(`(...values: T[]) => boolean`): A function that takes a list of values and returns `true` if any of the
predicates return truthy for the provided values, and `false` otherwise.

## Examples

```typescript
const func = overSome(
  (value) => typeof value === 'string',
  (value) => typeof value === 'number',
  (value) => typeof value === 'symbol'
);

func("hello"); // true
func(42); // true
func(Symbol()); // true
func([]); // false

const func = overSome([
  (value) => value.a > 0,
  (value) => value.b > 0
]);

func({ a: 0, b: 2 }); // true
func({ a: 0, b: 0 }); // false

const func = overSome(
  (a, b) => typeof a === 'string' && typeof b === 'string',
  (a, b) => a > 0 && b > 0
);

func("hello", "world"); // true
func(1, 10); // true
func(0, 2); // false
```
