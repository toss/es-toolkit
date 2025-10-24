# round

Rounds a number to a specified number of decimal places.

```typescript
const rounded = round(value, precision?);
```

## Reference

### `round(value, precision?)`

Use `round` when you want to round a number to a specific number of decimal places. It's a mathematical function for precise calculations.

```typescript
import { round } from 'es-toolkit/math';

// Default - rounds to integer.
const num1 = round(1.2345);
console.log(num1); // 1

// Round to 2 decimal places.
const num2 = round(1.2345, 2);
console.log(num2); // 1.23

// Round to 3 decimal places.
const num3 = round(1.2387, 3);
console.log(num3); // 1.239

// Can also round negative numbers.
const num4 = round(-1.2345, 2);
console.log(num4); // -1.23

// Handles large numbers too.
const num5 = round(123.456789, 4);
console.log(num5); // 123.4568
```

Useful in price calculations and statistics.

```typescript
import { round } from 'es-toolkit/math';

// Price calculation (to 2 decimal places)
const price = 19.999;
const finalPrice = round(price, 2);
console.log(finalPrice); // 20.00

// Percentage calculation (to 1 decimal place)
const percentage = 66.66666;
const displayPercentage = round(percentage, 1);
console.log(displayPercentage); // 66.7

// Rating calculation (to 1 decimal place)
const rating = 4.267;
const displayRating = round(rating, 1);
console.log(displayRating); // 4.3
```

Round in calculations where accuracy matters.

```typescript
import { round } from 'es-toolkit/math';

// Clean up math calculation results
const result = Math.PI * 2;
const cleanResult = round(result, 5);
console.log(cleanResult); // 6.28318

// Round measurement values
const measurement = 15.789123;
const rounded = round(measurement, 3);
console.log(rounded); // 15.789
```

Invalid precision values throw an error.

```typescript
import { round } from 'es-toolkit/math';

// Error occurs if precision is not an integer.
try {
  round(1.23, 2.5);
} catch (error) {
  console.error(error.message); // 'Precision must be an integer.'
}
```

#### Parameters

- `value` (`number`): The number to round.
- `precision` (`number`, optional): The number of decimal places. Must be an integer. Defaults to `0`.

#### Returns

(`number`): Returns the number rounded to the specified precision.

#### Throws

- Throws an error if `precision` is not an integer.
