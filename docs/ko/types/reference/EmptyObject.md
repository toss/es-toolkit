# EmptyObject

프로퍼티가 하나도 없는 객체예요.

```typescript
const empty: EmptyObject = {};
```

## 사용법

### `EmptyObject`

객체이긴 하지만 담을 데이터가 없는 자리에 사용하세요. `isEmptyObject`와 짝을 이뤄요.

```typescript
import type { EmptyObject } from 'es-toolkit/types';

const empty: EmptyObject = {}; // 통과해요

// const filled: EmptyObject = { a: 1 }; // 에러예요. 모든 값이 never여야 하거든요.

// 여러 단계로 나뉜 화면에서 어떤 단계는 넘길 데이터가 없을 때 유용해요.
interface StepContext {
  intro: EmptyObject;
  form: { amount: number };
  done: EmptyObject;
}
```
