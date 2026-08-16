# rest

Creates a new function that bundles parameters from a specific index into an array and passes them to the function.

```typescript
const restFunc = rest(func, startIndex);
```

## Usage

### `rest(func, startIndex?)`

Use `rest` when you want to bundle the remaining parameters into an array. Parameters before the specific index are passed individually, and parameters after are bundled into an array.

This is useful for creating functions that accept variable parameters or when you want to change how existing functions handle parameters.

```typescript
import { rest } from 'es-toolkit/function';

// Basic usage (bundle from the last parameter into an array)
function sum(a: number, b: number, numbers: number[]) {
  return a + b + numbers.reduce((sum, n) => sum + n, 0);
}

const restSum = rest(sum); // startIndex defaults to func.length - 1 (2)
console.log(restSum(1, 2, 3, 4, 5)); // 1 + 2 + (3 + 4 + 5) = 15
// The sum function is called with [1, 2, [3, 4, 5]]

// Bundle into an array starting from a different index
function logMessage(level: string, messages: string[]) {
  console.log(`[${level}] ${messages.join(' ')}`);
}

const restLog = rest(logMessage, 1); // Bundle from index 1
restLog('INFO', 'Application', 'started', 'successfully');
// Called as logMessage('INFO', ['Application', 'started', 'successfully'])

// Practical example: first parameter individual, rest as an array
function format(template: string, values: any[]) {
  return values.reduce((result, value, index) => {
    return result.replace(`{${index}}`, value);
  }, template);
}

const restFormat = rest(format, 1);
console.log(restFormat('Hello {0}, welcome to {1}!', 'John', 'our site'));
// 'Hello John, welcome to our site!'
```

It also handles cases where there are fewer parameters.

```typescript
import { rest } from 'es-toolkit/function';

function greet(greeting: string, name: string, extras: string[]) {
  const extraText = extras.length > 0 ? ` ${extras.join(' ')}` : '';
  return `${greeting} ${name}!${extraText}`;
}

const restGreet = rest(greet);

console.log(restGreet('Hello', 'Alice', 'Have a great day!'));
// 'Hello Alice! Have a great day!'

console.log(restGreet('Hi', 'Bob'));
// 'Hi Bob!' (extras becomes an empty array)

console.log(restGreet('Hey'));
// 'Hey undefined!' (name is undefined, extras is an empty array)
```

#### Parameters

- `func` (`F`): The function to change parameter handling.
- `startIndex` (`number`, optional): The index from which to start bundling into an array. Defaults to `func.length - 1`, bundling from the last parameter.

#### Returns

(`(...args: any[]) => ReturnType<F>`): Returns a new function that bundles parameters from a specific index into an array and passes them to the original function.
