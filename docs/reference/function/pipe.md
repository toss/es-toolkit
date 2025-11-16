# pipe

Runs the specified function pipeline starting from the base value, returning the final result.

```typescript
const result = pipe(value, func1, func2);
```

## Usage

### `pipe(value, ...funcs)`

Use `pipe` when you want to chain multiple functions together into a pipeline and run it immediately on a base value. The base value is the input of the first function, each function's return value becomes the input of the next function. This is useful to transform data without nesting function calls or using multiple temporary variables.

```typescript
const square = (n: number) => n * n;
const double = (n: number) => n * 2;
const tenth = (n: number) => n / 10;
const numToStr = (n: number) => String(n);

const result = pipe(5, square, double, tenth, numToStr);
```

#### Parameters

- `value` (`any`): The base value.
- `funcs` (`Array<(result: any) => any>`): The functions to execute in sequence.

#### Returns

(`any`): The return value of the final function in `funcs`. If no function is passed, `value` is returned directly.
