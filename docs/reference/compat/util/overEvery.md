# overEvery

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that checks if all of the given predicates return truthy for the provided values.

This function takes multiple predicates, which can either be individual predicate functions or arrays of predicates,
and returns a new function that checks if all of the predicates return truthy when called with the provided values.

## Signature

```typescript
function overEvery<T, U extends T, V extends T>(
  predicate1: (value: T) => value is U,
  predicate2: (value: T) => value is V
): (value: T) => value is U & V;
function overEvery<T>(
  ...predicates: Array<((...args: T[]) => boolean) | ReadonlyArray<(...args: T[]) => boolean>>
): (...args: T[]) => boolean;
```

### Parameters

- `predicates` (`...Array<((...values: T[]) => boolean) | ReadonlyArray<(...values: T[]) => boolean>>`): -
  A list of predicates or arrays of predicates. Each predicate is a function that takes one or more values of
  type `T` and returns a boolean indicating whether the condition is satisfied for those values.

### Returns

(`(...values: T[]) => boolean`): A function that takes a list of values and returns `true` if all of the
predicates return truthy for the provided values, and `false` otherwise.

## Examples

```typescript
const func = overEvery(
  (value) => typeof value === 'string',
  (value) => value.length > 3
);

func("hello"); // true
func("hi"); // false
func(42); // false

const func = overEvery([
  (value) => value.a > 0,
  (value) => value.b > 0
]);

func({ a: 1, b: 2 }); // true
func({ a: 0, b: 2 }); // false

const func = overEvery(
  (a, b) => typeof a === 'string' && typeof b === 'string',
  (a, b) => a.length > 3 && b.length > 3
);

func("hello", "world"); // true
func("hi", "world"); // false
func(1, 10); // false
```
