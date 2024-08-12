# sortBy

주어진 `iteratees` (또는 키)에 따라 객체 배열을 오름차순으로 정렬해요.

이 함수는 객체 배열, 정렬할 기준이 되는 iteratee (또는 키)의 배열을 받아요.
오름차순으로 정렬된 객체 배열을 반환해요.
`iteratees`가 객체의 키일 경우엔 해당 키에 해당하는 값을 기준으로 정렬해요.
`iteratees`가 `iteratee` 함수일 경우엔 해당 함수의 반환값을 기준으로 정렬해요.
키의 값이 동일한 경우 다음 키를 기준으로 정렬 순서를 결정해요.

> `iteratee` 함수는 객체를 매개변수로 받고 값을 반환하는 함수에요.

## 인터페이스

```typescript
function sortBy<T extends object>(collection: T[], iteratees: Array<Iteratee<T> | keyof T>): T[];
```

### 파라미터

- `collection` (`T[]`): 정렬할 객체 배열.
- `iteratees` (`Array<Iteratee<T> | keyof T>`): 정렬할 기준이 되는 iteratee 또는 키의 배열.

### 반환 값

(`T[]`) 정렬된 배열.

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
