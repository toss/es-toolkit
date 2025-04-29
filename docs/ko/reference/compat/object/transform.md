# transform

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

모든 컬렉션(배열 또는 객체)을 반복 함수에 적용해서 새로운 결과로 변환해요.

`transform()` 함수는 배열이나 객체의 각 속성을 통해 새로운 결과를 만들어가면서 진행돼요.
각 속성마다 현재 누적값과 속성 값을 사용하여 반복 함수를 호출해요.
누적값을 원하는 대로 수정할 수 있으며, 최종 누적값이 결과가 돼요.

초깃값을 제공하지 않으면 원래와 같은 프로토타입의 새로운 배열이나 객체를 생성해요.
또한, 반복 함수에서 `false`를 반환하여 변환을 일찍 멈출 수도 있어요.

## 인터페이스

```typescript
function transform<T, U>(
  object?: T[],
  iteratee?: ((accumulator: U, value: T, index: number, object: T[]) => unknown) | undefined | null,
  accumulator?: U | undefined | null
): U | undefined | null;
function transform<T extends object, U>(
  object?: T,
  iteratee?: ((accumulator: U, value: T[keyof T], key: keyof T, object: T) => unknown) | undefined | null,
  accumulator?: U | undefined | null
): U | undefined | null;
function transform<T, U>(
  object?: T[] | T | null | undefined,
  iteratee?: ((accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown) | undefined | null,
  accumulator?: U | undefined | null
): U | undefined | null;
```

### 파라미터

- `object` (`readonly T[] | T | null | undefined`): 반복할 객체예요.
- `iteratee` (`((accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown) | undefined | null`): 반복마다 호출되는 함수예요.
- `accumulator` (`U | undefined | null`): 초기 값이에요.

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
