# difference

두 배열의 차이를 계산해요.

이 함수는 파라미터로 두 배열을 받아서, 첫 번째 배열에 있지만 두 번째 배열에는 없는 요소들을 포함한 새로운 배열을 반환해요.
즉, 첫 번째 배열에서 두 번째 배열에 있는 요소들을 제외한 나머지 요소들로 구성된 배열을 만들어줘요.

## 인터페이스

```typescript
function difference<T>(firstArr: T[], secondArr: T[]): T[];
```

### 파라미터

- `firstArr` (`T[]`): 차이를 계산할 배열이에요. 이 배열이 주 배열이고, 이 배열의 요소들이 비교되고 필터링돼요.
- `secondArr` (`T[]`): 첫 번째 배열에서 제외할 요소들을 포함한 배열이에요. 이 배열의 각 요소는 첫 번째 배열과 비교되며, 일치하는 요소가 있으면 결과에서 제외돼요.

### 반환 값

(`T[]`): 첫 번째 배열에는 있지만 두 번째 배열에는 없는 요소들이 담긴 새로운 배열이에요.

## 예시

```typescript
import { difference } from 'es-toolkit/array';

// 사용 예제:
const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4];
const result = difference(array1, array2);
// 2와 4는 두 배열 모두에 있기 때문에 결과에서 제외되고, result 변수에는 [1, 3, 5]가 할당되어요.
```
