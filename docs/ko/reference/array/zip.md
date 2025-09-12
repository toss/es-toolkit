# zip

여러 배열을 튜플의 배열로 결합해요.

이 함수는 여러 배열을 받아서, 각 배열의 같은 인덱스에 있는 요소들을 하나의 튜플로 묶어서 새 배열을 반환해요. 입력 배열들의 길이가 다를 경우, 가장 긴 배열의 길이만큼 결과를 생성하고, 짧은 배열의 빈 자리는 `undefined`로 채워져요.

## 인터페이스

```typescript
function zip<T>(arr1: readonly T[]): Array<[T]>;
function zip<T, U>(arr1: readonly T[], arr2: readonly U[]): Array<[T, U]>;
function zip<T, U, V>(arr1: readonly T[], arr2: readonly U[], arr3: readonly V[]): Array<[T, U, V]>;
function zip<T, U, V, W>(arr1: readonly T[], arr2: readonly U[], arr3: readonly V[], arr4: readonly W[]): Array<[T, U, V, W]>;
function zip<T>(...arrs: Array<readonly T[]>): T[][];
```

### 파라미터

- `...arrs` (`Array<readonly T[]>`): 함께 묶을 배열들이에요.

### 반환 값

(`T[][]`): 각 입력 배열의 해당 인덱스 요소들을 튜플로 묶은 새 배열이에요.

## 예시

```typescript
import { zip } from 'es-toolkit/array';

// 두 배열을 결합하는 기본 사용법
const numbers = [1, 2, 3];
const letters = ['a', 'b', 'c'];
const result = zip(numbers, letters);
console.log(result);
// 출력: [[1, 'a'], [2, 'b'], [3, 'c']]

// 세 배열을 결합
const numbers2 = [1, 2];
const letters2 = ['a', 'b', 'c'];
const booleans = [true, false];
const result2 = zip(numbers2, letters2, booleans);
console.log(result2);
// 출력: [[1, 'a', true], [2, 'b', false], [undefined, 'c', undefined]]

// 길이가 다른 배열들
const short = [1, 2];
const long = ['a', 'b', 'c', 'd'];
const result3 = zip(short, long);
console.log(result3);
// 출력: [[1, 'a'], [2, 'b'], [undefined, 'c'], [undefined, 'd']]

// 하나의 배열만 전달
const single = [1, 2, 3];
const result4 = zip(single);
console.log(result4);
// 출력: [[1], [2], [3]]

// 빈 배열들
const empty1: number[] = [];
const empty2: string[] = [];
const result5 = zip(empty1, empty2);
console.log(result5);
// 출력: []

// 실용적인 예시: 키-값 쌍 생성
const keys = ['name', 'age', 'city'];
const values = ['Alice', 30, 'New York'];
const pairs = zip(keys, values);
console.log(pairs);
// 출력: [['name', 'Alice'], ['age', 30], ['city', 'New York']]
```

## Lodash 호환성

`es-toolkit/compat`에서 `zip`을 가져오면 Lodash와 완전히 호환돼요.

```typescript
import { zip } from 'es-toolkit/compat';

const result = zip([1, 2], ['a', 'b'], [true, false]);
// 결과: [[1, 'a', true], [2, 'b', false]]
```
