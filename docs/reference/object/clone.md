# clone

Creates a shallow copy of the given value.

```typescript
const cloned = clone(obj);
```

## Reference

### `clone(obj)`

Use `clone` when you want to create a shallow copy of objects, arrays, Dates, RegExps, and other values. A shallow copy means only the top-level properties are copied, and nested objects or arrays share references with the original.

```typescript
import { clone } from 'es-toolkit/object';

// Primitive values are returned as-is
const num = 29;
const clonedNum = clone(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

// Shallow copy of an array
const arr = [1, 2, 3];
const clonedArr = clone(arr);
console.log(clonedArr); // [1, 2, 3]
console.log(clonedArr === arr); // false

// Shallow copy of an object
const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
const clonedObj = clone(obj);
console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
console.log(clonedObj === obj); // false
console.log(clonedObj.c === obj.c); // true (nested array shares reference due to shallow copy)
```

It supports various JavaScript types like `Date`, `RegExp`, `Map`, and `Set`.

```typescript
// Date object
const date = new Date();
const clonedDate = clone(date);
console.log(clonedDate !== date); // true
console.log(clonedDate.getTime() === date.getTime()); // true

// RegExp object
const regex = /abc/gi;
const clonedRegex = clone(regex);
console.log(clonedRegex !== regex); // true
console.log(clonedRegex.source === regex.source); // true

// Map and Set
const map = new Map([['key', 'value']]);
const clonedMap = clone(map);
console.log(clonedMap !== map); // true
console.log(clonedMap.get('key')); // 'value'
```

#### Parameters

- `obj` (`T`): The value to clone. It can be any type, such as objects, arrays, or primitive values.

#### Returns

(`T`): A shallow copy of the given value.
