# Simplify

将交叉类型或映射类型展开为单个扁平的对象类型。类型本身相同，但编辑器会显示为 `{ a: 1; b: 2 }` 而不是 `A & B`。

```typescript
type Flat = Simplify<T>;
```

## 用法

### `Simplify<T>`

交叉类型（`&`）若保持原样，会在编辑器提示中显示为 `A & B`，让人难以看清真实结构。用 `Simplify` 包裹后，会把最终属性展开成一个对象。`?`（可选）和 `readonly` 标记也会保留。

```typescript
import type { Simplify } from 'es-toolkit/types';

type A = { name: string };
type B = { readonly age?: number };

// 不包裹时提示会显示为 'A & B'。
type Raw = A & B;

// Simplify 会将其展开为一个对象。?、readonly 标记也会保留。
type User = Simplify<A & B>;
// => { name: string; readonly age?: number }
```

#### 类型参数

- `T`：要展开的类型。
