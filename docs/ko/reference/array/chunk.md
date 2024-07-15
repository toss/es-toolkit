# chunk

배열을 정해진 길이에 맞게 더 작은 배열로 나눠요.

입력값으로 배열을 받아서, 정해진 길이를 따르는 더 작은 배열 여러 개로 나눠요.
입력 배열이 똑같은 길이로 나눠질 수 없다면, 나눠진 마지막 배열이 남은 요소들을 포함하게 돼요.

## 인터페이스

```typescript
function chunk<T>(arr: T[], size: number): T[][];
```

### 파라미터

- `arr` (`T[]`): 작은 배열들로 나눌 배열
- `size` (`number`): 작은 배열들의 길이. 양의 정수여야 해요.

### 반환 값

(`T[][]`): 최대 길이 `size`를 가지는 작은 배열들로 구성된 2차원 배열을 반환해요.

### 에러

`size`가 양의 정수가 아니면 에러를 던져요.

## 예시

```typescript
import { chunk } from 'es-toolkit/array';

// 숫자의 배열을 최대 2의 길이를 가지는 더 작은 배열들로 쪼개요.
chunk([1, 2, 3, 4, 5], 2);
// Returns: [[1, 2], [3, 4], [5]]

// 문자열의 배열을 최대 3의 길이를 가지는 더 작은 배열들로 쪼개요.
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
```

## Lodash 호환성

`es-toolkit/compat`에서 `chunk`를 가져오면 lodash와 호환돼요.

- `size`가 1보다 작으면 빈 배열을 반환해요.
- `size`에 소수점이 있는 숫자를 제공하더라도, 정수로 내림해요.

```typescript
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3], 0); // Returns []
```
