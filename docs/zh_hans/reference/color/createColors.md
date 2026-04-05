# createColors

用于直接控制颜色启用状态的工厂函数。

```typescript
import { createColors } from 'es-toolkit/color';

const c = createColors(true);  // 始终启用颜色
const noColor = createColors(false);  // 始终禁用颜色
```

## 用法

### `createColors(enabled?)`

不传参数时会自动检测环境。传入 `true`/`false` 可强制启用/禁用颜色。

```typescript
import { createColors } from 'es-toolkit/color';

// 在测试环境中强制禁用颜色
const c = createColors(false);
c.red('hello'); // 'hello' (不含 ANSI 代码)

// 在日志库中强制启用颜色
const log = createColors(true);
log.green('成功');  // '\x1b[32m成功\x1b[39m'
```

### 何时使用？

- **测试**：禁用颜色以便在没有 ANSI 代码的情况下进行纯字符串比较。
- **库开发**：为用户提供颜色选项的控制能力。
- **条件颜色**：仅在特定条件下应用颜色。

```typescript
import { createColors } from 'es-toolkit/color';

function createLogger(useColor: boolean) {
  const c = createColors(useColor);

  return {
    info: (msg: string) => console.log(c.blue(msg)),
    error: (msg: string) => console.error(c.red(msg)),
  };
}
```

#### 参数

- `enabled` (`boolean`, 可选)：是否启用颜色。省略时会自动检测环境。

#### 返回值

(`Colors`)：返回包含所有颜色、样式和扩展颜色函数的对象。
