# curryRight

Curries a function from right to left so it can be called with one argument at a time.

```typescript
const curriedFunc = curryRight(func);
```

## Reference

### `curryRight(func)`

Use `curryRight` when you want to partially apply a function from right to left. Unlike regular `curry`, it receives arguments starting from the last one.

```typescript
import { curryRight } from 'es-toolkit/function';

function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curryRight(sum);

// Provide value `10` for argument `c`
const add10 = curriedSum(10);

// Provide value `15` for argument `b`
const add25 = add10(15);

// Provide value `5` for argument `a`
// All arguments have been received, so now it returns the value
const result = add25(5);
// Returns: 30
```

This is useful when applying arguments from right to left feels more natural.

```typescript
function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const curriedGreet = curryRight(greet);
const greetJohn = curriedGreet('John');

greetJohn('Hello'); // Returns: 'Hello, John!'
greetJohn('Hi'); // Returns: 'Hi, John!'
```

#### Parameters

- `func` (`(...args: any[]) => any`): The function to curry.

#### Returns

(`(...args: any[]) => any`): A curried function that can be called with one argument at a time from right to left.
