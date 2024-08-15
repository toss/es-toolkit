# sortBy

주어진 조건 `criteria`에 따라서 객체로 이루어진 배열을 정렬해요.

- 조건이 프로퍼티 이름이면, 해당하는 프로퍼티 값에 따라 정렬해요.
- 조건이 함수이면, 함수가 반환하는 값에 따라 정렬해요.

배열은 오름차순으로 정렬돼요. 조건에 따라 두 요소의 값이 같으면, 다음 조건으로 정렬해요.

## 인터페이스

```typescript
function sortBy<T extends object>(arr: T[], criteria: Array<((item: T) => unknown) | keyof T>): T[];
```

### 파라미터

- `arr` (`T[]`): 정렬할 객체 배열.
- `criteria` (`Array<((item: T) => unknown) | keyof T>`): 정렬할 기준. 객체의 프로퍼티 이름이나 함수를 쓸 수 있어요.

### 반환 값

(`T[]`) 오름차순으로 정렬된 배열.

## 예시

```typescript
const users = [
  { user: 'foo', age: 24 },
  { user: 'bar', age: 7 },
  { user: 'foo ', age: 8 },
  { user: 'bar ', age: 29 },
];

sortBy(users, ['user', 'age']);
sortBy(users, [obj => obj.user, 'age']);
// results will be:
// [
//   { user : 'bar', age: 7 },
//   { user : 'bar', age: 29 },
//   { user : 'foo', age: 8 },
//   { user : 'foo', age: 24 },
// ]
```
