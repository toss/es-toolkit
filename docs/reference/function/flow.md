# flow

Creates a new function that executes multiple functions in sequence.

```typescript
const combinedFunc = flow(func1, func2, func3);
```

## Usage

### `flow(...funcs)`

Use `flow` when you want to chain functions together to create a pipeline. The result of the previous function becomes the input of the next function. This is useful for transforming data through multiple steps.

```typescript
import { flow } from 'es-toolkit/function';

const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;
const double = (n: number) => n * 2;

const combined = flow(add, square, double);

// First add(1, 2) = 3
// Then square(3) = 9
// Finally double(9) = 18
combined(1, 2);
// Returns: 18
```

This is especially useful for creating data transformation pipelines.

```typescript
const processData = flow(
  (text: string) => text.trim(),
  (text: string) => text.toLowerCase(),
  (text: string) => text.split(' '),
  (words: string[]) => words.filter(word => word.length > 3)
);

processData('  Hello World JavaScript  ');
// Returns: ['hello', 'world', 'javascript']
```

#### Parameters

- `funcs` (`Array<(...args: any[]) => any>`): The functions to execute in sequence.

#### Returns

(`(...args: any[]) => any`): A new function that executes the given functions in sequence. The first function can accept multiple arguments, and the remaining functions receive the result of the previous function.
