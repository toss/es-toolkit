# toFilled

배열의 요소를 지정된 값으로 채워요. 시작 위치부터 끝 위치까지의 요소들을 제공된 값으로 대체한 새로운 배열을 반환해요. 시작 또는 끝 인덱스를 제공하지 않으면 배열 전체를 채워요.

음수 인덱스를 사용할 수도 있어요. 이 경우 배열의 끝에서부터 인덱스를 계산해요.

## 인터페이스

```typescript
function toFilled<T, U>(arr: T[], value: U): Array<T | U>;
function toFilled<T, U>(arr: T[], value: U, start: number): Array<T | U>;
function toFilled<T, U>(arr: T[], value: U, start: number, end: number): Array<T | U>;
```

### 파라미터

- `arr` (`Array<T>`): 채울 배열이에요.
- `value` (`U`): 배열을 채울 값이에요.
- `start` (`number, 기본값 = 0`): 시작 위치예요. 기본값은 0이에요.
- `end` (`number, 기본값 = array.length`): 끝 위치예요. 기본값은 배열의 길이예요.

### 반환 값

(`Array<T | U>`): 지정된 값으로 채워진 새로운 배열이에요.

### 예시

```typescript
const array = [1, 2, 3, 4, 5];

let result = toFilled(array, '*', 2);
console.log(result); // [1, 2, '*', '*', '*']
console.log(array); // [1, 2, 3, 4, 5]

result = toFilled(array, '*', 1, 4);
console.log(result); // [1, '*', '*', '*', 5]
console.log(array); // [1, 2, 3, 4, 5]

result = toFilled(array, '*');
console.log(result); // ['*', '*', '*', '*', '*']
console.log(array); // [1, 2, 3, 4, 5]

result = toFilled(array, '*', -4, -1);
console.log(result); // [1, '*', '*', '*', 5]
console.log(array); // [1, 2, 3, 4, 5]
```
