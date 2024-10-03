# orderBy

여러 속성과 해당 순서 방향에 따라 객체 배열을 정렬해요.

주어진 조건 `criteria` 그리고 지정한 순서 방향에 따라서 객체로 이루어진 배열을 정렬해요.

- 조건이 프로퍼티 이름이면, 해당하는 프로퍼티 값에 따라 정렬해요.
- 조건이 함수이면, 함수가 반환하는 값에 따라 정렬해요.

배열은 지정된 순서에 따라 오름차순(`asc`) 혹은 내림차순(`desc`)으로 정렬돼요.
조건에 따라 두 요소의 값이 같으면, 다음 조건으로 정렬해요.
만약에 순서의 개수가 조건의 개수보다 적으면, 나머지는 마지막 순서로 정렬돼요.

## 인터페이스

```typescript
function orderBy<T extends object>(
  arr: T[],
  criteria: Array<((item: T) => unknown) | keyof T>,
  orders: Array<'asc' | 'desc'>
): T[];
```

### 파라미터

- `arr` (`T[]`): 정렬할 객체 배열.
- `criteria` (`Array<((item: T) => unknown) | keyof T>`): 정렬할 기준. 객체의 프로퍼티 이름이나 함수를 쓸 수 있어요.
- `orders` (`Array<'asc' | 'desc'>)`): 각 키에 대한 정렬 방향 배열('asc'는 오름차순, 'desc'는 내림차순).

### 반환 값

(`T[]`) 정렬된 배열.

## 예시

```typescript
// Sort an array of objects by 'user' in ascending order and 'age' in descending order.
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

const result = orderBy(users, [obj => obj.user, 'age'], ['asc', 'desc']);
// result will be:
// [
//   { user: 'barney', age: 36 },
//   { user: 'barney', age: 34 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 },
// ]
```
