# zip

여러 배열을 각 배열의 같은 인덱스 요소들을 묶은 튜플의 배열로 만들어요.

```typescript
const zipped = zip(...arrs);
```

## 사용법

### `zip(...arrs)`

여러 배열의 같은 위치에 있는 요소들을 하나로 묶고 싶을 때 `zip`을 사용하세요. 각 배열의 같은 인덱스에 있는 요소들을 튜플로 묶어서 새 배열을 반환해요.

```typescript
import { zip } from 'es-toolkit/array';

// 두 배열을 묶어요.
zip([1, 2, 3], ['a', 'b', 'c']);
// Returns: [[1, 'a'], [2, 'b'], [3, 'c']]

// 세 배열을 묶어요.
zip([1, 2], ['a', 'b', 'c'], [true, false]);
// Returns: [[1, 'a', true], [2, 'b', false], [undefined, 'c', undefined]]
```

배열의 길이가 다르면 가장 긴 배열의 길이에 맞춰져요. 짧은 배열의 빈 자리는 `undefined`로 채워져요.

```typescript
import { zip } from 'es-toolkit/array';

zip([1, 2], ['a', 'b', 'c', 'd']);
// Returns: [[1, 'a'], [2, 'b'], [undefined, 'c'], [undefined, 'd']]
```

#### 파라미터

- `arrs` (`Array<readonly T[]>`): 묶을 배열들이에요.

#### 반환 값

(`T[][]`): 각 입력 배열의 해당 인덱스 요소들을 튜플로 묶은 새 배열을 반환해요.
