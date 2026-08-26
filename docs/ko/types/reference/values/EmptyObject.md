# EmptyObject

아무 값도 들어 있지 않은 빈 객체예요.

```typescript
const empty: EmptyObject = {};
```

## 사용법

### `EmptyObject`

객체 자리이긴 한데 넘길 데이터가 없을 때 사용하세요. 값이 비어 있는지 검사하는 `isEmptyObject`와 짝을 이뤄요.

```typescript
import type { EmptyObject } from 'es-toolkit/types';

const empty: EmptyObject = {}; // 잘 통과해요

// const filled: EmptyObject = { a: 1 }; // 값이 하나라도 있으면 에러가 나요.

// 여러 단계로 나뉜 화면에서, 넘길 데이터가 없는 단계를 표현할 때 좋아요.
interface StepContext {
  intro: EmptyObject;
  form: { amount: number };
  done: EmptyObject;
}
```
