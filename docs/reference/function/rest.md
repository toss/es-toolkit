# rest

Creates a function that invokes `func` with the `this` binding of the created function and arguments from `start` and beyond provided as an array.

## Signature

```typescript
function rest<F extends (...args: any[]) => any>(func: F, start: number): (...args: any[]) => ReturnType<F>;
```

### Parameters

- `func` (`F`): The function to apply a rest parameter to.
- `start` (`number`, optional): The start position of the rest parameter, defaulting to `func.length - 1`.

### Returns

(`(...args: any[]) => ReturnType<F>`): Returns the new function.

## Examples

```typescript
function fn(a, b, c) {
  return Array.from(arguments);
}

rest(fn)(1, 2, 3, 4); // [1, 2, [3, 4]]
rest(fn, 1)(1, 2, 3, 4); // [1, [2, 3, 4]]
rest(fn)(1); // [1, undefined, []]
```
