# compact

거짓으로 평가되는 값들을 제거한 새 배열을 반환해요.

```typescript
const compacted = compact(arr);
```

## 레퍼런스

### `compact(arr)`

배열에서 거짓으로 평가되는 값들(`false`, `null`, `0`, `-0`, `0n`, `''`, `undefined`, `NaN`)을 제거하고 싶을 때 `compact`를 사용하세요. 참으로 평가되는 값들만 남은 새 배열이 반환돼요.

```typescript
import { compact } from 'es-toolkit/array';

// 다양한 거짓 값들을 제거해요.
compact([0, -0, 0n, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
// Returns: [1, 2, 3, 4, 5]

// 문자열 배열에서 빈 문자열을 제거해요.
compact(['hello', '', 'world', '', '!']);
// Returns: ['hello', 'world', '!']
```

타입 시스템이 거짓으로 평가되는 타입들을 자동으로 제외해요.

```typescript
import { compact } from 'es-toolkit/array';

const mixed: (string | number | false | null)[] = ['text', 0, false, null, 5];
const result = compact(mixed);
// result의 타입은 (string | number)[]
```

#### 파라미터

- `arr` (`T[]`): 거짓으로 평가되는 값을 제거할 배열이에요.

#### 반환 값

(`Array<Exclude<T, false | null | 0 | 0n | '' | undefined>>`): 거짓으로 평가되는 값들이 제거된 새 배열이에요.
