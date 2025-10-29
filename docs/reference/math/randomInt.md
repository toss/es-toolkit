# randomInt

Generates a random integer within a specified range.

```typescript
const randomInteger = randomInt(min, max);
```

## Reference

### `randomInt(maximum)` / `randomInt(minimum, maximum)`

Use `randomInt` when you need a random integer. It returns only integers without decimal points.

```typescript
import { randomInt } from 'es-toolkit/math';

// Generate a random integer between 0 and 5 (exclusive).
const num1 = randomInt(5);
console.log(num1); // e.g., 3

// Generate a random integer between 2 and 10 (exclusive).
const num2 = randomInt(2, 10);
console.log(num2); // e.g., 7

// Can be used with negative ranges.
const num3 = randomInt(-5, -1);
console.log(num3); // e.g., -3

// Simulate a dice roll (1-6)
const diceRoll = randomInt(1, 7);
console.log(diceRoll); // e.g., 4

// Select a random index from an array
const items = ['apple', 'banana', 'cherry', 'date'];
const randomIndex = randomInt(items.length);
console.log(items[randomIndex]); // e.g., 'banana'
```

#### Parameters

- `maximum` (`number`): The maximum value (exclusive) when using a single parameter. Must be greater than 0.
- `minimum` (`number`): The minimum value (inclusive).
- `maximum` (`number`): The maximum value (exclusive). Must be greater than the minimum value.

#### Returns

(`number`): Returns a random integer within the specified range.

#### Throws

Throws an error if the maximum value is less than or equal to the minimum value.
