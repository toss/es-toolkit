# groupBy

키 생성 함수에 따라 배열의 요소들을 그룹으로 나눈 새 객체를 반환해요.

```typescript
const grouped = groupBy(arr, getKeyFromItem);
```

## 사용법

### `groupBy(arr, getKeyFromItem)`

배열의 요소들을 특정 기준에 따라 분류하고 싶을 때 `groupBy`를 사용하세요. 각 요소에서 키를 생성하는 함수를 제공하면, 같은 키를 가진 요소들끼리 묶어서 객체로 반환해줘요. 반환되는 객체의 값은 각 그룹에 속하는 요소들의 배열이에요. 데이터를 카테고리별로 정리하거나 그룹별 분석을 할 때 유용해요.

```typescript
import { groupBy } from 'es-toolkit/array';

// 객체 배열을 카테고리별로 그룹화해요.
const items = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];

const result = groupBy(items, item => item.category);
// 결과:
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

다양한 기준으로 그룹화할 수 있어요.

```typescript
import { groupBy } from 'es-toolkit/array';

// 문자열 길이별로 그룹화해요.
const words = ['one', 'two', 'three', 'four', 'five'];
const byLength = groupBy(words, word => word.length);
// 결과: { 3: ['one', 'two'], 4: ['four', 'five'], 5: ['three'] }

// 짝수/홀수별로 그룹화해요.
const numbers = [1, 2, 3, 4, 5, 6];
const byParity = groupBy(numbers, num => (num % 2 === 0 ? 'even' : 'odd'));
// 결과: { odd: [1, 3, 5], even: [2, 4, 6] }
```

#### 파라미터

- `arr` (`T[]`): 그룹화할 배열이에요.
- `getKeyFromItem` (`(item: T, index: number, array: T[]) => K`): 각 요소, 인덱스, 배열에서 키를 생성하는 함수예요.

#### 반환 값

(`Record<K, T[]>`): 키에 따라 요소들이 그룹화된 객체를 반환해요.
