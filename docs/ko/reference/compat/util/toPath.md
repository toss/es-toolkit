# toPath (Lodash 호환성)

깊은 키 문자열을 경로 배열로 변환해요.

```typescript
const path = toPath(deepKey);
```

## 사용법

### `toPath(deepKey)`

깊은 키 문자열을 경로 배열로 변환해요. 점 표기법과 대괄호 표기법을 모두 지원해요.

```typescript
import { toPath } from 'es-toolkit/compat';

// 점 표기법
toPath('a.b.c');
// Returns: ['a', 'b', 'c']

// 대괄호 표기법
toPath('a[b][c]');
// Returns: ['a', 'b', 'c']

// 혼합 표기법
toPath('a.b[c].d');
// Returns: ['a', 'b', 'c', 'd']

// 따옴표로 감싼 키
toPath('a["b.c"].d');
// Returns: ['a', 'b.c', 'd']
```

앞에 점이나 빈 키도 처리해요.

```typescript
import { toPath } from 'es-toolkit/compat';

// 앞에 점이 있는 경우
toPath('.a.b.c');
// Returns: ['', 'a', 'b', 'c']

// 빈 문자열
toPath('');
// Returns: []

// 복잡한 경로
toPath('.a[b].c.d[e]["f.g"].h');
// Returns: ['', 'a', 'b', 'c', 'd', 'e', 'f.g', 'h']
```

#### 파라미터

- `deepKey` (`any`): 경로 배열로 변환할 깊은 키 문자열이에요.

#### 반환 값

(`string[]`): 경로의 각 부분으로 이뤄진 문자열 배열을 반환해요.
