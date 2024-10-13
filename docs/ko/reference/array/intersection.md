# intersection

두 배열 모두에 포함되어 있는 요소를 반환해요.

이 함수는 두 개의 배열을 받고, 두 배열 모두에 포함되어 있는 요소로 구성된 새로운 배열을 반환해요.
실제로는 첫 번째 배열의 요소들 중에서 두 번째 배열에 포함되어 있지 않은 요소들을 제거해요.

## 인터페이스

```typescript
function intersection<T>(firstArr: T[], secondArr: T[]): T[];
```

### 파라미터

- `firstArr` (`T[]`): 비교할 첫 번째 배열.
- `secondArr` (`T[]`): 비교할 두 번째 배열.

### 반환 값

(`T[]`) 두 배열 모두에 포함되어 있는 요소로 구성된 새로운 배열.

## 예시

```typescript
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const result = intersection(array1, array2);
// 두 배열에 모두 포함되어 있는 [3, 4, 5]를 반환해요.
```

## Lodash와의 호환성

`es-toolkit/compat`에서 `intersection`을 가져오면 lodash와 호환돼요.

- `intersection`은 공통 요소를 찾기 위해 여러 개의 유사 배열 객체를 받을 수 있어요.
- `intersection`은 고유한 요소만 반환해요.

```typescript
import { intersection } from 'es-toolkit/compat';

const array1 = [1, 2, 3, 4, 4, 5];
const array2 = [2, 4];
const array3 = [4, 6];
const result = intersection(array1, array2, array3);
// 결과는 [4]예요. 이 유일한 요소는 모든 배열에 존재해요.

const arrayLike1 = { 0: 1, 1: 2, 2: 3, length: 3 };
const arrayLike2 = { 0: 2, 1: 3, length: 2 };
const result2 = intersection(arrayLike1, arrayLike2);
// 결과2는 [2, 3]예요. 이 요소들은 두 유사 배열 객체에 존재해요.
```
