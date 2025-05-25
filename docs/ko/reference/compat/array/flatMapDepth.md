# flatMapDepth

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

배열 또는 객체의 각 요소에 대해 `iteratee` 함수를 실행하고 결과를 지정된 깊이까지 평탄화해요.

## 인터페이스

```typescript
function flatMapDepth<T>(
  collection:
    | Record<string, ArrayLike<T | RecursiveArray<T>> | T>
    | Record<number, ArrayLike<T | RecursiveArray<T>> | T>
    | null
    | undefined
): T[];

function flatMapDepth<T, R>(
  array: ArrayLike<T> | null | undefined,
  iteratee: (value: T, index: number, array: ArrayLike<T>) => ArrayLike<R | RecursiveArray<R>> | R,
  depth?: number
): R[];

function flatMapDepth<T extends object, R>(
  collection: T,
  iteratee: (value: T[keyof T], key: string, object: T) => ArrayLike<R | RecursiveArray<R>> | R,
  depth?: number
): R[];

function flatMapDepth(collection: object | null | undefined, path: string, depth?: number): any[];

function flatMapDepth(collection: object | null | undefined, matches: object, depth?: number): boolean[];
```

### 파라미터

- `collection` (`Record<string, ArrayLike<T | RecursiveArray<T>> | T> | Record<number, ArrayLike<T | RecursiveArray<T>> | T> | null | undefined`): 순회할 객체 또는 배열이에요.
- `iteratee`: 각 요소마다 호출될 함수예요. 기본값은 `identity`예요.
  - `(value: T, index: number, array: ArrayLike<T>) => ArrayLike<R | RecursiveArray<R>> | R`: 각 요소마다 호출될 함수예요.
  - `(value: T[keyof T], key: string, object: T) => ArrayLike<R | RecursiveArray<R>> | R`: 각 요소마다 호출될 함수예요.
  - `string`: 평탄화할 속성 경로예요.
  - `object`: 매칭할 객체예요. 매칭 결과는 `boolean` 배열로 반환돼요.
- `depth` (`number`): 평탄화할 깊이예요. 기본값은 `1`이에요.

### 반환 값

- (`T[] | R[] | any[] | boolean[]`): 새로운 평탄화된 배열을 반환해요.

## 예시

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

// 배열을 반환하는 함수를 사용한 기본 예제
function duplicate(n) {
  return [n, n];
}

flatMapDepth([1, 2], duplicate);
// => [1, 1, 2, 2]

// 깊이 지정하기
flatMapDepth(
  [
    [
      [1, 2],
      [3, 4],
    ],
  ],
  n => [n, n],
  2
);
// => [1, 1, 2, 2, 3, 3, 4, 4]

// 매칭 객체 사용하기
flatMapDepth({ a: 1, b: 2 }, { a: 1 });
// => [true, false]

// 속성 경로 사용하기
flatMapDepth({ a: { a: 1, b: 2 } }, 'a');
// => [1, 2]
```
