# EmptyObject

没有任何属性的对象。

```typescript
const empty: EmptyObject = {};
```

## 用法

### `EmptyObject`

当某个值必须是对象但不携带数据时使用。它与 `isEmptyObject` 相对应。

```typescript
import type { EmptyObject } from 'es-toolkit/types';

const empty: EmptyObject = {}; // 通过

// const filled: EmptyObject = { a: 1 }; // 报错，所有值都必须是 never。

// 在分成多个步骤的流程中，某些步骤不携带数据时很有用。
interface StepContext {
  intro: EmptyObject;
  form: { amount: number };
  done: EmptyObject;
}
```
