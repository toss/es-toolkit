# orderBy

여러 속성과 해당 순서 방향에 따라 객체 배열을 정렬해요.

이 함수는 객체 배열, 정렬할 키의 배열, 그리고 정렬 방향의 배열을 받아요.
각 키에 대해 해당 방향('asc'는 오름차순, 'desc'는 내림차순)에 따라 정렬된 배열을 반환해요.
키의 값이 동일한 경우 다음 키를 기준으로 정렬 순서를 결정해요.

::: info
만약에 키의 값 중에 하나의 타입이 `string`이고 다른 하나가 `number`인 경우, JavaScript는 `string`을 `number`로 암묵적으로 변환 후 비교해요. 이 경우 타입이 `string`인 값이 형 변환 과정에서 `NaN`이 되는 경우엔, 대소 비교 시 항상 `false`를 반환하게 돼서 예상과 다른 결과가 나올 수 있어요.

`es-toolkit`은 이러한 경우를 방지하기 위해, 위의 경우에는 `number`를 `string`으로 변환해서 비교해요. 다만, `es-toolkit/compat`에 있는 `orderBy` 함수는 호환성을 위해 이러한 변환을 하지 않아요.
:::

## 인터페이스

```typescript
function orderBy<T>(collection: T[], keys: Array<keyof T>, orders: Order[]): T[];
```

### 파라미터

- `collection` (`T[]`): 정렬할 객체 배열.
- `keys` (`Array<keyof T>`): 정렬할 키(속성) 배열.
- `orders` (`Order[]`): 각 키에 대한 정렬 방향 배열('asc'는 오름차순, 'desc'는 내림차순).

### 반환 값

(`T[]`) 정렬된 배열.

## 예시

### 일반적인 경우

```typescript
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

const result = orderBy(users, ['user', 'age'], ['asc', 'desc']);
// result will be:
// [
//   { user: 'barney', age: 36 },
//   { user: 'barney', age: 34 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 },
// ]
```

### `string`과 `number` 간 비교하는 경우

```typescript
const data = [
  { id: 1, value: 'a' },
  { id: 2, value: 2 },
  { id: 12, value: 1 },
  { id: 5, value: 'b' },
  { id: 4, value: 2 },
  { id: 43, value: 'c' },
  { id: 24, value: 3 },
  { id: 3, value: '3a' },
  { id: 6, value: '2a' },
  { id: 7, value: '1cs' },
];

const result = orderBy(data, ['value', 'id'], ['asc', 'asc']);
// result will be:
// [
//   { id: 12, value: 1 },
//   { id: 7, value: '1cs' },
//   { id: 2, value: 2 },
//   { id: 4, value: 2 },
//   { id: 6, value: '2a' },
//   { id: 24, value: 3 },
//   { id: 3, value: '3a' },
//   { id: 1, value: 'a' },
//   { id: 5, value: 'b' },
//   { id: 43, value: 'c' },
// ];
```
