# isFiniteNumber

Checks if a given value is a finite number.
A finite number is a number that is not `Infinity`, `-Infinity`, or `NaN`.
You can use it as a TypeScript type guard, narrowing the type of the parameter to `number`.

## Interface

```typescript
function isFiniteNumber(value: unknown): value is number;
```

### Parameters

- `value` (`unknown`): The value to check if it is a finite number.

### Returns

(`value is number`): Returns `true` if the value is a finite number; otherwise, `false`.

## Examples

```typescript
import { isFiniteNumber } from 'es-toolkit/predicate';

const value1 = 42;
const value2 = -42;
const value3 = Infinity;
const value4 = -Infinity;
const value5 = NaN;
const value6 = 'string';
const value7 = {};

console.log(isFiniteNumber(value1)); // true
console.log(isFiniteNumber(value2)); // true
console.log(isFiniteNumber(value3)); // false
console.log(isFiniteNumber(value4)); // false
console.log(isFiniteNumber(value5)); // false
console.log(isFiniteNumber(value6)); // false
console.log(isFiniteNumber(value7)); // false
```
