# keyBy

배열의 요소를 쉽게 찾을 수 있도록, 키-값 쌍을 이루는 객체로 바꿔요.

이 함수는 파라미터로 배열과 각 요소에서 키를 생성하는 함수를 받아요.
키는 함수에서 생성된 키이고, 값은 해당 키를 생성한 요소인 객체를 반환해요.
만약 동일한 키를 생성하는 요소가 여러 개 있다면, 그 중 마지막 요소가 값으로 사용돼요.

## 인터페이스

```typescript
function keyBy<T, K extends PropertyKey>(arr: readonly T[], getKeyFromItem: (item: T) => K): Record<K, T>;
```

### 파라미터

- `arr` (`T[]`): 매핑할 배열.
- `getKeyFromItem` (`(item: T) => K`): 요소에서 키를 생성하는 함수.

### 반환 값

(`Record<K, T>`) 키와 해당 배열 요소들이 매핑된 객체를 반환해요.

## 예시

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];
const result = keyBy(array, item => item.category);
// 결과값:
// {
//   fruit: { category: 'fruit', name: 'banana' },
//   vegetable: { category: 'vegetable', name: 'carrot' }
// }
```
