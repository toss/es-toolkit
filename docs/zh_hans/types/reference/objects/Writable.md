# Writable

移除对象所有属性上的 `readonly` 标记。内置 `Readonly` 的逆操作。

```typescript
type Mutable = Writable<T>;
```

## 用法

### `Writable<T>`

当你想让一个被 `as const` 或 `Readonly` 固定而无法修改的类型重新变为可修改时使用。

```typescript
import type { Writable } from 'es-toolkit/types';

type Config = { readonly host: string; readonly port: number };

type MutableConfig = Writable<Config>;
// => { host: string; port: number }

const config: MutableConfig = { host: 'localhost', port: 8080 };
config.port = 3000; // ok
```

`readonly` 只从最外层属性移除。它不会触及嵌套对象的内部，所以请用于浅层场景。

#### 类型参数

- `T`：要变为可写的对象类型。
