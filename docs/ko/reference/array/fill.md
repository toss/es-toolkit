# fill

배열의 요소를 지정된 값으로 채워요. 시작 위치부터 끝 위치까지의 요소들을 제공된 값으로 대체해요.

이 함수는 원본 배열을 변경하고, 제공된 값으로 시작 인덱스부터 끝 인덱스까지의 요소를 대체해요.
시작 또는 끝 인덱스를 제공하지 않으면 배열 전체를 채워요.

음수 인덱스를 사용할 수도 있어요. 이 경우 배열의 끝에서부터 인덱스를 계산해요.

## 인터페이스

```typescript
function fill<T>(array: unknown[], value: T): T[];
function fill<T, U>(array: T[], value: T, start: number): Array<T | U>;
function fill<T, U>(array: T[], value: T, start: number, end: number): Array<T | U>;
```

### 파라미터

- `array` (`Array<T | U>`): 채울 배열이에요.
- `value` (`U`): 배열을 채울 값이에요.
- `start` (`number`, 기본값 = 0): 시작 위치예요. 기본값은 0이에요.
- `end` (`number`, 기본값 = array.length): 끝 위치예요. 기본값은 배열의 길이예요.

### 반환 값

(`Array<T | U>`): 채워진 값이 있는 배열을 반환해요.

## 예시

```typescript
const array1 = [1, 2, 3];
const result1 = fill(array1, 'a');
// result1는 ['a', 'a', 'a']가 돼요.

const array2 = Array(3);
const result2 = fill(array2, 2);
// result2는 [2, 2, 2]가 돼요.

const array3 = [4, 6, 8, 10];
const result3 = fill(array3, '*', 1, 3);
// result3는 [4, '*', '*', 10]가 돼요.

const array4 = [1, 2, 3];
const result4 = fill(array4, '*', -2, -1);
// result4는 [1, '*', 3]가 돼요.
```
