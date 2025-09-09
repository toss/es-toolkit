# cloneDeepWith

주어진 객체를 깊이 복사해요.

`cloneValue` 함수로 깊이 복사하는 방법을 조정할 수 있어요. 함수는 현재 값 `value`, 프로퍼티 이름 `key`, 전체 객체 `obj`를 인자로 받아요. 함수가 값을 반환하면 그 값을 사용하고, `undefined`를 반환하면 기본 방법으로 복사해요.

## 인터페이스

```typescript
function cloneDeepWith<T>(
  obj: T,
  cloneValue: (value: any, key: PropertyKey | undefined, obj: T, stack: Map<any, any>) => any
): T;
```

### 파라미터

- `obj` (`T`): 복사할 객체.
- `cloneValue` (`(value: any, key: PropertyKey | undefined, obj: T, stack: Map<any, any>) => any`): 값을 복사하는 방법을 나타내는 함수. 기본 방법을 사용하지 않고 값을 복사해서 반환할 수 있어요. `undefined`를 반환하면 기본 방법으로 값이 복사돼요.
  - `value`: 현재 복사되고 있는 값.
  - `key`: 현재 복사되고 있는 값에 대한 프로퍼티 이름.
  - `obj`: 복사할 전체 객체 `obj`.
  - `stack`: 순환 참조를 처리하기 위한 내부 스택(`Map`).

### 반환 값

(`T`): 주어진 객체의 깊은 복사본.

## 예시

```typescript
// Clone a primitive value
const num = 29;
const clonedNum = cloneDeepWith(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

// Clone an object with a customizer
const obj = { a: 1, b: 2 };
const clonedObj = cloneDeepWith(obj, value => {
  if (typeof value === 'number') {
    return value * 2; // Double the number
  }
});
console.log(clonedObj); // { a: 2, b: 4 }
console.log(clonedObj === obj); // false

// Clone an array with a customizer
const arr = [1, 2, 3];
const clonedArr = cloneDeepWith(arr, value => {
  return value + 1; // Increment each value
});
console.log(clonedArr); // [2, 3, 4]
console.log(clonedArr === arr); // false
```
