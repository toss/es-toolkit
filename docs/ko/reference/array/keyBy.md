# keyBy

주어진 키 생성 함수로 배열의 각 요소를 매핑해요.

이 함수는 파라미터로 배열과 각 요소에서 키를 생성하는 함수를 받아요.
키는 함수에서 생성된 키이고, 값은 해당 키를 생성한 요소인 객체를 반환해요.
만약 동일한 키를 생성하는 요소가 여러 개 있다면, 그 중 마지막 요소가 값으로 사용돼요.

## Signature

```typescript
function keyBy<T, K extends string>(arr: readonly T[], getKeyFromItem: (item: T) => K): Record<K, T>;
```

### Parameters

- `arr` (`T[]`): 매핑할 배열.
- `getKeyFromItem` (`(item: T) => K`): 요소에서 키를 생성하는 함수.

### Returns

(`Record<K, T>`) 키와 해당 배열 요소들이 매핑된 객체를 반환해요.

## Examples

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
