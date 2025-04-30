# transform

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

객체의 값을 순회하면서, 원하는 형태로 누적해서 새 객체를 만들어요.

`accumulator`에 초깃값을 제공하지 않으면, 프로토타입의 새로운 배열이나 객체를 생성해서 사용해요.

`iteratee` 함수가 반환하는 값이 `false`이면, 순회를 중단해요.

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
