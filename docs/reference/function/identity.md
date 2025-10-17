# identity

Returns the input value as is.

```typescript
const result = identity(value);
```

## Reference

### `identity(value)`

Use `identity` when you want to return a value without modifying it.

This is useful as a default value for functions passed as arguments. It's commonly used to return the value itself in array `map` or `filter` operations, or as a placeholder in functional programming.

```typescript
import { identity } from 'es-toolkit/function';

// Returns the number as is
const num = identity(5);
console.log(num); // 5

// Returns the string as is
const str = identity('hello');
console.log(str); // 'hello'

// Returns the object as is
const obj = identity({ key: 'value' });
console.log(obj); // { key: 'value' }

// Example using with an array
const numbers = [1, 2, 3, 4, 5];
const same = numbers.map(identity);
console.log(same); // [1, 2, 3, 4, 5]
```

#### Parameters

- `value` (`T`): The value to return.

#### Returns

(`T`): Returns the input value as is.
