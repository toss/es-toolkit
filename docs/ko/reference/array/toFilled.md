# toFilled

배열의 특정 요소를 지정된 값으로 채운 새로운 배열을 생성해요.
이 함수는 원본 배열을 변경하지 않아요.

주어진 배열을 기반으로 새로운 배열을 생성하고, 시작 위치부터 끝 위치까지의 요소를 지정된 값으로 채워요. 시작 위치 또는 끝 위치를 제공하지 않으면 배열 전체를 채워요.

음수 인덱스를 사용할 수도 있으며, 이 경우 배열의 끝에서부터 인덱스를 계산해요.

## 인터페이스

```typescript
export function toFilled<T, U>(arr: T[], value: U): Array<T | U>;
export function toFilled<T, U>(arr: T[], value: U, start: number): Array<T | U>;
export function toFilled<T, U>(arr: T[], value: U, start: number, end: number): Array<T | U>;
```

### 파라미터

- `arr` (`Array<T>`): 새 배열의 기반이 되는 배열입니다.
- `value` (`U`): 새 배열을 채울 값입니다.
- `start` (`number, 기본값 = 0`): 시작 위치입니다. 기본값은 0입니다.
- `end` (`number, 기본값 = array.length`): 끝 위치입니다. 기본값은 배열의 길이입니다.

### 반환 값

(`Array<T | U>`): 지정된 값으로 채워진 새로운 배열입니다.

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
