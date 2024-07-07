# orderBy

여러 속성과 해당 순서 방향에 따라 객체 배열을 정렬해요.

이 함수는 객체 배열, 정렬할 키의 배열, 그리고 정렬 방향의 배열을 받아요.
각 키에 대해 해당 방향('asc'는 오름차순, 'desc'는 내림차순)에 따라 정렬된 배열을 반환해요.
키의 값이 동일한 경우 다음 키를 기준으로 정렬 순서를 결정해요.

## Signature

```typescript
function orderBy<T>(collection: T[], keys: Array<keyof T>, orders: Order[]): T[];
```

### Parameters

- `collection` (`T[]`): 정렬할 객체 배열.
- `keys` (`Array<keyof T>`): 정렬할 키(속성) 배열.
- `orders` (`Order[]`): 각 키에 대한 정렬 방향 배열('asc'는 오름차순, 'desc'는 내림차순).

### Returns

(`T[]`) 정렬된 배열.

## Examples

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
