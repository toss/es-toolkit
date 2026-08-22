# EmptyObject

プロパティを 1 つも持たないオブジェクトです。

```typescript
const empty: EmptyObject = {};
```

## 使用法

### `EmptyObject`

オブジェクトではあるが渡すデータがない場所で使います。`isEmptyObject` と対になります。

```typescript
import type { EmptyObject } from 'es-toolkit/types';

const empty: EmptyObject = {}; // 通ります

// const filled: EmptyObject = { a: 1 }; // エラーです。すべての値が never である必要があります。

// 複数のステップに分かれた画面で、データを持たないステップがあるときに便利です。
interface StepContext {
  intro: EmptyObject;
  form: { amount: number };
  done: EmptyObject;
}
```
