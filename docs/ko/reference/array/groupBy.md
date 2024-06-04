# groupBy

주어진 키 생성 함수에 따라서 배열의 요소를 분류해요.

이 함수는 파라미터로 배열과 각 요소에서 키를 생성하는 함수를 받아요.
키는 함수에서 생성된 키이고, 값은 그 키를 공유하는 요소끼리 묶은 배열인 객체를 반환해요.

## 인터페이스

```typescript
function groupBy<T, K extends string>(arr: T[], getKeyFromItem: (item: T) => K): Record<K, T[]>;
```

### 파라미터

- `arr` (`T[]`): 요소를 분류할 배열.
- `getKeyFromItem` (`(item: T) => K`): 요소에서 키를 생성하는 함수.

### 반환 값

(`Record<K, T[]>`): 키에 따라 요소가 분류된 객체를 반환해요.

## 예시

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];
const result = groupBy(array, item => item.category);
// 결괏값:
// {
//   fruit: [
//     { category: 'fruit', name: 'apple' },
//     { category: 'fruit', name: 'banana' }
//   ],
//   vegetable: [
//     { category: 'vegetable', name: 'carrot' }
//   ]
// }
```
