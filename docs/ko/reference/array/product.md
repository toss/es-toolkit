# product

여러 배열의 [데카르트 곱](https://en.wikipedia.org/wiki/Cartesian_product)을 계산해요.

```typescript
const tuples = product(arr1, arr2);
```

## 사용법

### `product(...arrs)`

각 배열에서 하나씩 골라 만들 수 있는 모든 조합이 필요할 때 `product`를 사용하세요. 튜플은 사전순으로 나오고, 가장 오른쪽 배열이 가장 빠르게 변해요. 마치 자릿수가 늘어나는 숫자처럼요.

```typescript
import { product } from 'es-toolkit/array';

// 숫자 하나와 알파벳 하나를 모두 짝지어요.
product([1, 2], ['a', 'b']);
// Returns: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

// 3비트 이진 튜플을 모두 생성해요.
product([0, 1], [0, 1], [0, 1]);
// Returns: [[0,0,0], [0,0,1], [0,1,0], [0,1,1], [1,0,0], [1,0,1], [1,1,0], [1,1,1]]
```

입력 배열 중 하나라도 비어 있으면 결과는 빈 배열이에요. 인자가 없으면 빈 튜플 하나를 담은 배열이 나와요.

```typescript
import { product } from 'es-toolkit/array';

product([1, 2, 3], []); // []
product(); // [[]]
```

#### 파라미터

- `arrs` (`Array<readonly T[]>`): 곱을 계산할 배열들이에요.

#### 반환 값

(`T[][]`): 데카르트 곱 결과로 만들어진 튜플들의 배열이에요.

## 사용해보기

::: sandpack

```ts index.ts
import { product } from 'es-toolkit/array';

console.log(product([1, 2], ['a', 'b']));
```

:::
