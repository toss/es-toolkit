# pipe

Runs the specified function pipeline starting from the base value, returning the final result.

```typescript
const result = pipe(value, func1, func2);
```

## Usage

### `pipe(value, ...funcs)`

Use `pipe` when you want to chain multiple functions together into a pipeline and run it immediately on a base value. The base value is the input of the first function, each function's return value becomes the input of the next function. This is useful to transform data without nesting function calls or using multiple temporary variables.

```typescript
const double = (n: number) => n * 2;
const square = (n: number) => n * n;
const half = (n: number) => n / 2;
const numToStr = (n: number) => String(n);

// First double(5) = 10
// Second square(10) = 100
// Third half(100) = 50
// Finally numToStr(50) -> '50'
const result = pipe(5, double, square, half, numToStr);
// Returns: '50'
```

#### Parameters

- `value` (`any`): The base value.
- `funcs` (`Array<(result: any) => any>`): The functions to execute in sequence.

#### Returns

(`any`): The return value of the final function in `funcs`. If no function is passed, `value` is returned directly.
