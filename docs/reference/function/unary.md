# unary

Creates a new function that limits a function to accept only the first parameter.

```typescript
const unaryFunc = unary(func);
```

## Usage

### `unary(func)`

Use `unary` when you want to limit a function to accept only one parameter. Any additional parameters passed are ignored.

This is useful for preventing callback functions from receiving more parameters than expected in array methods like `map`, `filter`, and `forEach`.

```typescript
import { unary } from 'es-toolkit/function';

// Basic usage
function greet(name: string, age?: number, city?: string) {
  console.log(`Hello, ${name}!`);
  if (age) console.log(`Age: ${age}`);
  if (city) console.log(`City: ${city}`);
}

const greetOnlyName = unary(greet);
greetOnlyName('Cheolsu', 25, 'Seoul'); // Only logs 'Hello, Cheolsu!'

// Using with array methods
const numbers = ['1', '2', '3', '4', '5'];

// parseInt accepts radix as a second parameter,
// but map's callback passes (value, index, array)
console.log(numbers.map(parseInt)); // [1, NaN, NaN, NaN, NaN] (unexpected result)

// Use unary to pass only the first parameter
console.log(numbers.map(unary(parseInt))); // [1, 2, 3, 4, 5] (expected result)

// Another example: when a function accepts multiple parameters but you want to use only one
function logValue(value: any, prefix: string = 'Value:', suffix: string = '') {
  console.log(`${prefix} ${value} ${suffix}`);
}

const data = ['apple', 'banana', 'cherry'];

// When you want to log only the value without prefix and suffix
data.forEach(unary(logValue));
// Value: apple
// Value: banana
// Value: cherry
```

It's also useful in function composition.

```typescript
import { unary } from 'es-toolkit/function';

// Function that accepts multiple parameters
function multiply(a: number, b: number = 1, c: number = 1) {
  return a * b * c;
}

// Limit to use only the first parameter
const multiplyOne = unary(multiply);

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => multiplyOne(x, 2, 3)); // b and c are ignored
console.log(doubled); // [1, 2, 3, 4, 5] (result of 1 * 1 * 1)
```

#### Parameters

- `func` (`F`): The function to limit to accept only the first parameter.

#### Returns

(`(...args: any[]) => ReturnType<F>`): Returns a new function that passes only the first parameter to the original function.
