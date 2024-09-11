# map

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

컬렉션의 요소들을 순회하며 변환 함수(이터레이터)를 적용한 결과를 반환하는 배열을 생성해요.
배열, 객체, 기타 여러 타입의 컬렉션과 함께 사용할 수 있어 다양한 데이터 구조에서 호환돼요.
만약 이터레이터가 제공되지 않으면, 컬렉션의 원래 요소들을 반환해요.

## 인터페이스

```typescript
function map<T, U>(
  collection: T[] | Record<string, T> | number | string | boolean | null | undefined,
  iteratee?: ((value: T, key: string | number) => U) | keyof T | null
): U[];
```

### 파라미터
- `collection` (`T[] | Record<string, T> | number | string | boolean | null | undefined`): 순회할 컬렉션. 배열이나 객체, 원시 타입이 될 수 있어요. 컬렉션이 `null` 또는 `undefined`인 경우 빈 배열을 반환해요.
- `iteratee` (`(value: T, key: string | number) => U | keyof T | null`, 선택): 각 요소마다 호출되는 변환 함수에요. 함수가 제공되면, 해당 함수가 각 요소에 대해 변환 작업을 수행해요. 만약 이터레이터가 속성 키(예: `keyof T`)라면, 각 요소의 해당 속성 값이 반환돼요. 이터레이터가 제공되지 않으면, 원래 요소들이 그대로 반환돼요.

### 반환 값
(`U[]`): 변환된 값들로 이루어진 새로운 배열이에요.

### 예시

```typescript
// 변환 함수를 사용하는 경우
const array = [1, 2, 3];
map(array, (value) => value * 2); // => [2, 4, 6]

// 속성 키를 이터레이터로 사용하는 경우
const objects = [{a: 1}, {a: 2}, {a: 3}];
map(objects, 'a'); // => [1, 2, 3]

// 이터레이터가 없는 경우
const numbers = [1, 2, 3];
map(numbers); // => [1, 2, 3]

// 객체를 사용하는 경우
const obj = {a: 1, b: 2, c: 3};
map(obj, (value, key) => `${key}: ${value}`); // => ['a: 1', 'b: 2', 'c: 3']
```
