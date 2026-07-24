# NonEmptyArray

保证至少包含一个元素的数组类型。第一个元素被收窄为 `T` 而不是 `T | undefined`。

```typescript
type Arr = NonEmptyArray<T>;
```

## 用法

### `NonEmptyArray<T>`

当你想在类型层面表达“不能为空的数组”时使用。空数组无法赋值，且访问第一个元素时始终收窄为 `T`，因此无需 `undefined` 检查即可使用。

```typescript
import type { NonEmptyArray } from 'es-toolkit/types';

const a: NonEmptyArray<number> = [1, 2, 3]; // ok
const b: NonEmptyArray<number> = [1];       // ok
const c: NonEmptyArray<number> = [];        // 错误：不允许空数组。

function first<T>(arr: NonEmptyArray<T>): T {
  // 第一个元素被收窄为 T，因此无需 undefined 检查。
  return arr[0];
}
```

#### 类型参数

- `T`：数组元素的类型。
