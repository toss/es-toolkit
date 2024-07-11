# clone

Creates a shallow clone of the given objects.

## Signature

```typescript
function clone<T>(value: T): T;
```

### Parameters

- `obj` (`T`): The object to clone.

### Returns

(`T`): A shallow clone of the given object

## Examples

```typescript
const num = 29;
const clonedNum = clone(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

const arr = [1, 2, 3];
const clonedArr = clone(arr);
console.log(clonedArr); // [1, 2, 3]
console.log(clonedArr === arr); // false

const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
const clonedObj = clone(obj);
console.log(clonedObj); // { a: 1, b: 'es-toolkit' }
console.log(clonedObj === obj); // false
```
