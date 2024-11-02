# rangeRight

Returns an array of numbers from `end` to `start`, decrementing by `step`.

If `step` is not provided, it defaults to `1`. Note that `step` must be a non-zero integer.

## Signature

```typescript
function rangeRight(end: number): number[];
function rangeRight(start: number, end: number): number[];
function rangeRight(start: number, end: number, step: number): number[];
```

### Parameters

- `start` (`number`): The starting number of the range (inclusive).
- `end` (`number`): The end number of the range (exclusive).
- `step` (`number`): The step value for the range. (default: `1`)

### Returns

- (`number[]`): An array of numbers from `end` to `start` with the specified `step`.

## Examples

```typescript
// Returns [3, 2, 1, 0]
rangeRight(4);

// Returns [15, 10, 5, 0]
rangeRight(0, 20, 5);

// Returns [20, 15, 10, 5, 0]
rangeRight(0, 21, 5);

// Returns [-3, -2, -1, 0]
rangeRight(0, -4, -1);

// Throws an error: The step value must be a non-zero integer.
rangeRight(1, 4, 0);
```
