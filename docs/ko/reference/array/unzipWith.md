# unzipWith

결합되어 있는 2차원 배열을 1차원 배열로 풀고, `iteratee` 함수로 값을 변환해서 새로운 배열을 반환해요.

## 인터페이스

```typescript
function unzipWith<T, R>(target: T[][], iteratee: (...args: T[]) => R): R[];
```

### 파라미터

- `target` (`T[][]`): 결합을 풀고 변환할 배열이에요.
- `iteratee` (`(...args: T[]) => R`): 결합이 풀린 배열을 변환할 함수예요.

### 반환 값

(`R[]`): 결합을 풀고 변환된 값들로 만들어진 새로운 배열이에요.

## 예시

```typescript
const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const result = unzipWith(nestedArray, (item, item2, item3) => item + item2 + item3);
// [9, 12]
```

## Lodash와 호환성

`es-toolkit/compat`에서 `unzipWith`를 가져오면 lodash와 완전히 호환돼요.

호환 모드에서 다음과 같은 기능을 제공해요:

- **null/undefined 처리**: 입력 배열이 null이나 undefined일 때는 빈 배열을 반환해요.
- **유사 배열 객체**: 일반 배열 외에도 유사 배열 객체(array-like objects)를 처리할 수 있어요.
- **iteratee 함수**: iteratee 함수는 재구성된 요소들을 인자로 받아서 원하는 타입으로 변환할 수 있어요. iteratee가 null이나 undefined인 경우에는 `unzip`처럼 동작하여 변환 없이 결합이 풀린 배열을 반환해요.

### 인터페이스

```typescript
function unzipWith<T>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined): T[][];
function unzipWith<T>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined, iteratee?: null): T[][];
function unzipWith<T, R>(
  array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined,
  iteratee: (...args: T[]) => R
): R[];
function unzipWith<T>(
  array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined,
  iteratee: (...args: any[]) => unknown
): any[];
```

### 예시

```typescript
// iteratee 함수를 사용하는 예시
const array1 = [[1, 3], [2, 4]];
const result1 = unzipWith(array3, (a, b) => a + b);
// result3는 [3, 7]이 돼요. iteratee 함수가 제공되면 재구성된 요소들을 변환하기 때문이에요.

// iteratee가 null이나 undefined인 경우
const array2 = [[1, 3], [2, 4]];
const result2 = unzipWith(array1, null);
// result1은 [[1, 2], [3, 4]]가 돼요. iteratee가 null이면 unzip처럼 동작하기 때문이에요.

// 입력값이 null이나 undefined인 경우
const result3 = unzipWith(null);
// result3는 []가 돼요. 입력 배열이 null이기 때문이에요.

// 유사 배열 객체를 사용하는 예시
const arrayLike = { 0: [1, 2], 1: [3, 4], length: 2 };
const result4 = unzipWith(arrayLike, (a, b) => a + b);
// result4는 [4, 6]이 돼요. 유사 배열 객체도 처리할 수 있기 때문이에요.
```