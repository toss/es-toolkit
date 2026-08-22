# DeepPartial

递归地将 `T` 的所有属性变为可选（optional）。与只影响第一层的内置 `Partial` 不同，它会一直深入到嵌套对象内部，将所有属性都变为可选。

```typescript
type Patch = DeepPartial<T>;
```

## 用法

### `DeepPartial<T>`

在构建只覆盖嵌套配置对象一部分的补丁类型时很方便。

```typescript
import type { DeepPartial } from 'es-toolkit/types';

type Config = {
  server: { host: string; port: number };
  debug: boolean;
};

type ConfigPatch = DeepPartial<Config>;
// => { server?: { host?: string; port?: number }; debug?: boolean }

const patch: ConfigPatch = { server: { port: 8080 } }; // ok，可省略 host
```

#### 递归规则

深入到哪里、在哪里停止都是有明确规定的。

- **深入的对象**：普通对象、数组/元组，以及 `Map`/`Set` 的内容。但数组元素本身不会变为可选（数组不会变为稀疏数组）。
- **原样通过的对象**：函数、`Date`、`RegExp` 保持不变通过。

```typescript
import type { DeepPartial } from 'es-toolkit/types';

// 数组只递归元素类型，不会变为稀疏数组。
type A = DeepPartial<{ tags: string[] }>; // { tags?: string[] }

// Map/Set 会递归到其内容。
type B = DeepPartial<Map<string, { x: number }>>; // Map<string, { x?: number }>

// 函数和 Date 原样通过。
type C = DeepPartial<{ at: Date; run: () => void }>; // { at?: Date; run?: () => void }
```

#### 类型参数

- `T`：要深度变为可选的类型。
