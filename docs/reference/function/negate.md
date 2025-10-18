# negate

Creates a new function that inverts the return value of a function that returns true or false.

```typescript
const negatedFunc = negate(booleanFunc);
```

## Reference

### `negate(func)`

Use `negate` when you want to invert the result of a function that returns true or false.

This is useful for inverting conditional functions or filtering logic. For example, you can turn a function that finds even numbers into a function that finds odd numbers.

```typescript
import { negate } from 'es-toolkit/function';

// Basic usage
const isEven = (n: number) => n % 2 === 0;
const isOdd = negate(isEven);

console.log(isEven(2)); // true
console.log(isOdd(2)); // false

console.log(isEven(3)); // false
console.log(isOdd(3)); // true

// Using in array filtering
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter(isEven);
console.log(evenNumbers); // [2, 4, 6]

const oddNumbers = numbers.filter(negate(isEven));
console.log(oddNumbers); // [1, 3, 5]
```

You can also invert complex conditional functions.

```typescript
import { negate } from 'es-toolkit/function';

const isLongString = (str: string) => str.length > 5;
const isShortString = negate(isLongString);

const words = ['hi', 'hello', 'world', 'javascript'];

const longWords = words.filter(isLongString);
console.log(longWords); // ['hello', 'javascript']

const shortWords = words.filter(isShortString);
console.log(shortWords); // ['hi', 'world']
```

#### Parameters

- `func` (`F`): A function that returns a boolean value.

#### Returns

(`F`): Returns a new function that accepts the same arguments as the original function but returns the opposite boolean value.
