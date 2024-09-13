# uniqBy

`mapper` 함수가 반환하는 값을 기준으로, 배열 내 요소들의 중복을 제거해요.

## 인터페이스

```typescript
function uniqBy<T, U>(arr: T[], mapper: (item: T) => U): T[];
```

### 파라미터

- `arr` (`T[]`): 중복을 제거할 배열.
- `mapper` (`(item: T) => U`): 비교하기 위해 요소를 새로운 값으로 변환할 함수.

### 반환 값

(`T[]`): `mapper` 함수가 반환하는 값을 기준으로 중복이 제거된 배열.

## 예시

```typescript
uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor);
// [1.2, 2.1, 3.2, 5.7, 7.19]
```

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];
uniqBy(array, item => item.category).length;
// 2
```
