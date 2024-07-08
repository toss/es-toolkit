# range

Returns an array of numbers from `start` to `end`, incrementing by `step`.

If `step` is not provided, it defaults to `1`. Note that `step` must be a non-zero integer.

## Signature

```typescript
function range(end: number): number[];
function range(start: number, end: number): number[];
function range(start: number, end: number, step: number): number[];
```

### Parameters

- `start` (`number`): The starting number of the range (inclusive).
- `end` (`number`): The end number of the range (exclusive).
- `step` (`number`): The step value for the range. (default: `1`)

### Returns

- (`number[]`): An array of numbers from `start` to `end` with the specified `step`.

## Examples

```typescript
// Returns [0, 1, 2, 3]
range(4);

// Returns [0, 5, 10, 15]
range(0, 20, 5);

// Returns [0, 5, 10, 15, 20]
range(0, 21, 5);

// Returns [0, -1, -2, -3]
range(0, -4, -1);

// Throws an error: The step value must be a non-zero integer.
range(1, 4, 0);
```
