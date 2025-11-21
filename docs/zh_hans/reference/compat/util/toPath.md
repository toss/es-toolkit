# toPath (Lodash 兼容性)

将深层键字符串转换为路径数组。

```typescript
const path = toPath(deepKey);
```

## 用法

### `toPath(deepKey)`

将深层键字符串转换为路径数组。支持点表示法和方括号表示法。

```typescript
import { toPath } from 'es-toolkit/compat';

// 点表示法
toPath('a.b.c');
// Returns: ['a', 'b', 'c']

// 方括号表示法
toPath('a[b][c]');
// Returns: ['a', 'b', 'c']

// 混合表示法
toPath('a.b[c].d');
// Returns: ['a', 'b', 'c', 'd']

// 用引号包围的键
toPath('a["b.c"].d');
// Returns: ['a', 'b.c', 'd']
```

还能处理前导点或空键。

```typescript
import { toPath } from 'es-toolkit/compat';

// 前导点的情况
toPath('.a.b.c');
// Returns: ['', 'a', 'b', 'c']

// 空字符串
toPath('');
// Returns: []

// 复杂路径
toPath('.a[b].c.d[e]["f.g"].h');
// Returns: ['', 'a', 'b', 'c', 'd', 'e', 'f.g', 'h']
```

#### 参数

- `deepKey` (`any`): 要转换为路径数组的深层键字符串。

#### 返回值

(`string[]`): 返回由路径各部分组成的字符串数组。
