# partialRight

Creates a new function with some parameters pre-applied from the right.

```typescript
const partialRightFunc = partialRight(func, arg1, arg2);
```

## Usage

### `partialRight(func, ...args)`

Use `partialRight` when you want to fix some parameters of a function from the right. Opposite to `partial`, pre-provided parameters are placed at the back of the function, and parameters passed later are added to the front.

This is useful when you want to fix the last parameters and dynamically change only the front parameters.

You can use `partialRight.placeholder` to pass specific parameters later.

```typescript
import { partialRight } from 'es-toolkit/function';

// Basic usage
function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const greetJohn = partialRight(greet, 'John');
console.log(greetJohn('Hello')); // 'Hello, John!'
console.log(greetJohn('Hi')); // 'Hi, John!'

// Applying multiple parameters
function subtract(a: number, b: number, c: number) {
  return a - b - c;
}

const subtractFrom10And5 = partialRight(subtract, 5, 2);
console.log(subtractFrom10And5(10)); // 10 - 5 - 2 = 3

// Applying constants in mathematical operations
function divide(dividend: number, divisor: number) {
  return dividend / divisor;
}

const divideBy2 = partialRight(divide, 2);
console.log(divideBy2(10)); // 10 / 2 = 5
console.log(divideBy2(20)); // 20 / 2 = 10
```

You can adjust the parameter order using placeholders.

```typescript
import { partialRight } from 'es-toolkit/function';

function formatMessage(level: string, message: string, timestamp: string) {
  return `[${level}] ${message} at ${timestamp}`;
}

// Fix only the last parameter and pass the others later
const logWithTime = partialRight(formatMessage, partialRight.placeholder, '2023-01-01');
console.log(logWithTime('INFO', 'Application started'));
// '[INFO] Application started at 2023-01-01'

// Using with arrays
const numbers = [1, 2, 3, 4, 5];
const appendSuffix = partialRight((num: number, suffix: string) => `${num}${suffix}`, 'th');
const result = numbers.map(appendSuffix);
console.log(result); // ['1th', '2th', '3th', '4th', '5th']
```

#### Parameters

- `func` (`F`): The function to partially apply parameters to.
- `args` (`any[]`, optional): The parameters to pre-apply from the right.

#### Returns

(`(...args: any[]) => ReturnType<F>`): Returns a new function with some parameters pre-applied from the right.
