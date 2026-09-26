# hash

将值转换为43字符的哈希字符串。

```typescript
const hashed = hash(value);
```

## 用法

### `hash(value)`

当您需要值的简短且稳定的标识符时(例如缓存键或变更检测令牌),请使用 `hash`。值首先通过 [`serialize`](./serialize.md) 序列化,然后使用 SHA-256 计算摘要,并以 Base64URL 格式编码。

结构相同的值(例如 `{ a: 1, b: 2 }` 和 `{ b: 2, a: 1 }`)总是具有相同的哈希。

`hash` 只能通过专用入口点 `es-toolkit/util/hash` 使用。它无法从主入口点访问,因此除非您显式导入它,否则不会对打包体积产生任何影响。

```typescript
import { hash } from 'es-toolkit/util/hash';

hash({ b: 2, a: 1 }) === hash({ a: 1, b: 2 });
// 返回 true

hash([1, 2, 3]);
// 返回 'phXuruId5Red4IDejDBSyNqQEThAa6ccOMAyhF99VPQ'

hash(new Set([3, 1, 2])) === hash(new Set([1, 2, 3]));
// 返回 true

hash({ a: 1 }) === hash({ a: 2 });
// 返回 false
```

在 Node.js 中,`hash` 使用原生的 `node:crypto` 实现,需要 Node.js 20.12 或更高版本。在浏览器和边缘运行时中,使用输出逐字节相同的纯 JavaScript SHA-256 实现,因此哈希在所有平台上都是稳定的。

无法序列化的值(例如 `Promise`、`WeakMap` 或 `Blob`)会抛出 `TypeError`。

```typescript
hash(new WeakMap());
// 抛出 TypeError: Cannot serialize WeakMap
```

::: warning 请勿用于对安全性敏感的用途

`hash` 是为缓存键和变更检测而构建的。为了性能,序列化格式不会转义字符串或键,因此可以构造恶意输入来产生哈希冲突。请勿将其用于密码、签名或任何对安全性重要的场景。

:::

#### 参数

- `value` (`unknown`): 要哈希的值。

#### 返回值

(`string`): 序列化值的 SHA-256 哈希,以 Base64URL 编码的43字符字符串。

#### 错误

(`TypeError`): 如果值中包含无法序列化的对象,则会发生错误。
