# groupBy

주어진 키 생성 함수 또는 프로퍼티 키에 따라서 배열의 요소를 분류해요.

이 함수는 파라미터로 배열과 각 요소에서 키를 생성하는 함수 또는 프로퍼티 키 문자열을 받아요.
키는 함수에서 생성된 키 또는 프로퍼티 키이고, 값은 그 키를 공유하는 요소끼리 묶은 배열인 객체를 반환해요.

## 인터페이스

```typescript
function groupBy<T, K extends PropertyKey>(arr: readonly T[], keyOrFn: ((item: T) => K) | keyof T): Record<K, T[]>;
```

### 파라미터

- `arr` (`readonly T[]`): 요소를 분류할 배열.
- `keyOrFn` (`((item: T) => K) | keyof T`): 요소에서 키를 생성하는 함수 또는 그룹화할 프로퍼티의 키.

### 반환 값

(`Record<K, T[]>`): 키에 따라 요소가 분류된 객체를 반환해요.

## 예시

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];

// 키 생성 함수를 사용하는 경우:
const result1 = groupBy(array, item => item.category);

// 프로퍼티 키를 사용하는 경우:
const result2 = groupBy(array, 'category');

// 둘 다 같은 결과가 나와요:
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
