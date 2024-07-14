# clone

주어진 객체의 얇은 복사본을 생성해요.

## Signature

```typescript
function clone<T>(value: T): T;
```

### Parameters

- `obj` (`T`): 복사할 객체예요.

### Returns

(`T`): 주어진 객체의 얇은 복사본이에요.

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
console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
console.log(clonedObj === obj); // false
```
