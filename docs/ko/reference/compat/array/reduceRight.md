# reduceRight

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

리듀서 함수를 사용해서 배열 또는 객체를 하나의 값으로 줄여요. [reduce](./reduce.md)와 다르게 오른쪽에서 시작해요.

배열의 요소 또는 객체의 값을 하나씩 순회하면서, "리듀서"라고 불리는 특별한 함수를 적용해요.
이전 단계의 결과와 현재 요소를 사용해서 계산을 수행해요.
모든 요소를 순회한 다음 최종 결과를 반환해요.

`reduceRight()` 함수가 시작될 때 사용할 이전 단계의 결과가 없어요.
초기 값을 제공하면 그 값으로 시작해요.
초기 값을 제공하지 않으면 배열의 마지막 요소나 객체의 마지막 값을 사용하고, 두 번째로 마지막 요소나 값부터 계산을 시작해요.

## 인터페이스

```typescript
function reduceRight<T, U>(
  collection: T[],
  iteratee: (accumulator: U, value: T, index: number, collection: T[]) => U,
  initialValue: U
): U;
function reduceRight<T>(collection: T[], iteratee: (accumulator: T, value: T, index: number, collection: T[]) => T): T;

function reduceRight<T, U>(
  collection: ArrayLike<T>,
  iteratee: (accumulator: U, value: T, index: number, collection: ArrayLike<T>) => U,
  initialValue: U
): U;
function reduceRight<T>(
  collection: ArrayLike<T>,
  iteratee: (accumulator: T, value: T, index: number, collection: ArrayLike<T>) => T
): T;

function reduceRight<T extends object, U>(
  collection: T,
  iteratee: (accumulator: U, value: T[keyof T], key: keyof T, collection: T) => U,
  initialValue: U
): U;
function reduceRight<T extends object>(
  collection: T,
  iteratee: (accumulator: T[keyof T], value: T[keyof T], key: keyof T, collection: T) => T[keyof T]
): T[keyof T];
```

### 파라미터

- `collection` (`T[] | ArrayLike<T> | Record<string, T> | null | undefined`): 반복할 컬렉션.
- `iteratee` (`((accumulator: any, value: any, index: PropertyKey, collection: any) => any) | PropertyKey | object`): 반복할 때 호출되는 함수.
- `initialValue` (`any`): 초기 값.

### 반환 값

(`U`): 하나의 값으로 줄여진 값.

## 예시

```typescript
// Using a reducer function
const array = [1, 2, 3];
reduceRight(array, (acc, value) => acc + value, 0); // => 6

// Using a reducer function with initialValue
const array = [1, 2, 3];
reduceRight(array, (acc, value) => acc + value % 2 === 0, true); // => false

// Using an object as the collection
const obj = { a: 1, b: 2, c: 3 };
reduceRight(obj, (acc, value) => acc + value, 0); // => 6
```
