# reduce (Lodash 호환성)

::: warning `Array.prototype.reduce`나 `Object.values`와 `reduce`를 사용하세요

이 `reduce` 함수는 복잡한 타입 처리와 다양한 입력 형태 지원으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.reduce` 메서드나 객체의 경우 `Object.values`와 함께 사용하세요.

:::

배열이나 객체를 하나의 값으로 줄여요.

```typescript
const result = reduce(collection, iteratee, initialValue);
```

## 인터페이스

```typescript
function reduce<T, U>(
  collection: T[],
  iteratee: (accumulator: U, value: T, index: number, collection: T[]) => U,
  initialValue: U
): U;
function reduce<T>(collection: T[], iteratee: (accumulator: T, value: T, index: number, collection: T[]) => T): T;

function reduce<T, U>(
  collection: ArrayLike<T>,
  iteratee: (accumulator: U, value: T, index: number, collection: ArrayLike<T>) => U,
  initialValue: U
): U;
function reduce<T>(
  collection: ArrayLike<T>,
  iteratee: (accumulator: T, value: T, index: number, collection: ArrayLike<T>) => T
): T;

function reduce<T extends object, U>(
  collection: T,
  iteratee: (accumulator: U, value: T[keyof T], key: keyof T, collection: T) => U,
  initialValue: U
): U;
function reduce<T extends object>(
  collection: T,
  iteratee: (accumulator: T[keyof T], value: T[keyof T], key: keyof T, collection: T) => T[keyof T]
): T[keyof T];
```

### 파라미터

- `collection` (`T[] | ArrayLike<T> | Record<string, T> | null | undefined`): 반복할 컬렉션.
- `iteratee` (`((accumulator: any, value: any, index: PropertyKey, collection: any) => any) | PropertyKey | object`): 반복할 때 호출되는 함수.
- `initialValue` (`any`): 초기 값.

### 반환 값

(`any`): 하나의 값으로 줄여진 값.

## 예시

```typescript
// Using a reducer function
const array = [1, 2, 3];
reduce(array, (acc, value) => acc + value, 0); // => 6

// Using a reducer function with initialValue
const array = [1, 2, 3];
reduce(array, (acc, value) => acc + value % 2 === 0, true); // => false

// Using an object as the collection
const obj = { a: 1, b: 2, c: 3 };
reduce(obj, (acc, value) => acc + value, 0); // => 6
```
