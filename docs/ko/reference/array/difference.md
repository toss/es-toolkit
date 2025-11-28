# difference

첫 번째 배열에서 두 번째 배열에 있는 요소들을 제외한 새 배열을 반환해요.

```typescript
const result = difference(firstArr, secondArr);
```

## 사용법

### `difference(firstArr, secondArr)`

두 배열의 차집합을 구하고 싶을 때 `difference`를 사용하세요. 첫 번째 배열에만 있고 두 번째 배열에는 없는 요소들로 이루어진 새 배열이 반환돼요.

두 번째 배열에 리터럴이나 구체적인 값을 넘기면 TypeScript의 타입 추론이 강화돼서 `Exclude<T, U>`를 활용한 반환 타입이 자동으로 좁혀져요.

```typescript
import { difference } from 'es-toolkit/array';

// 숫자 배열의 차집합을 구해요.
const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4];
difference(array1, array2);
// Returns: [1, 3, 5]
// 타입: (1 | 3 | 5)[]
// 2와 4는 두 배열 모두에 있어서 제외돼요.

// 문자열 배열의 차집합을 구해요.
const colors1 = ['red', 'blue', 'green'];
const colors2 = ['blue', 'yellow'];
difference(colors1, colors2);
// Returns: ['red', 'green']
// 타입: ('red' | 'green')[]
```

빈 배열과의 차집합은 원래 배열과 같아요.

```typescript
import { difference } from 'es-toolkit/array';

difference([1, 2, 3], []); // [1, 2, 3]
difference([], [1, 2, 3]); // []
```

#### 파라미터

- `firstArr` (`readonly T[]`): 차집합을 구할 기준 배열이에요.
- `secondArr` (`readonly U[]`): 첫 번째 배열에서 제외할 요소들을 포함한 배열이에요. 두 번째 배열을 리터럴 값으로 정의하면 반환 타입이 자동으로 `Exclude<T, U>[]`로 좁혀져요.

#### 반환 값

(`Exclude<T, U>[]`): 첫 번째 배열에만 있고 두 번째 배열에는 없는 요소들로 이루어진 새 배열이에요. 두 번째 배열을 넓은 타입으로 선언하면 반환 타입은 `T[]`로 유지돼요.

## 성능 비교

|            | [번들 사이즈](../../bundle-size.md) | [성능](../../performance.md) |
| ---------- | ----------------------------------- | ---------------------------- |
| es-toolkit | 90 바이트 (92.4% 작음)              | 9,317,227 회 (85% 빠름)      |
| lodash-es  | 7,958 바이트                        | 5,030,861 회                 |
