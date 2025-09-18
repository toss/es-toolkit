# transform (Lodash 호환성)

::: warning `reduce`나 `forEach`를 사용하세요

이 `transform` 함수는 복잡한 누적기 처리와 다양한 입력 타입 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.reduce()`, `Object.entries().reduce()`, 또는 `forEach()`를 사용하세요.

:::

객체나 배열의 값들을 순회하면서 원하는 형태로 누적해서 새로운 객체를 만들어요.

```typescript
const result = transform(object, iteratee, accumulator);
```

## 인터페이스

```typescript
export function transform<T, U>(
  object: readonly T[],
  iteratee?: (acc: U, curr: T, index: number, arr: readonly T[]) => void,
  accumulator?: U
): U;

export function transform<T, U>(
  object: Record<string, T>,
  iteratee?: (acc: U, curr: T, key: string, dict: Record<string, T>) => void,
  accumulator?: U
): U;

export function transform<T extends object, U>(
  object: T,
  iteratee?: (acc: U, curr: T[keyof T], key: keyof T, dict: Record<keyof T, T[keyof T]>) => void,
  accumulator?: U
): U;
```

### 파라미터

- `object` (`readonly T[] | T`): 반복할 객체.
- `iteratee` (`(accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown`): 반복마다 호출되는 함수.
- `accumulator` (`U`): 초깃값.

### 반환 값

(`U | undefined | null`): 누적된 값을 반환해요.

## 예시

```typescript
// Transform an array
const array = [2, 3, 4];
transform(
  array,
  (acc, value) => {
    acc += value;
    return value % 2 === 0;
  },
  0
); // => 5

// Transform an object
const obj = { a: 1, b: 2, c: 1 };
transform(
  obj,
  (result, value, key) => {
    (result[value] || (result[value] = [])).push(key);
  },
  {}
); // => { '1': ['a', 'c'], '2': ['b'] }
```
