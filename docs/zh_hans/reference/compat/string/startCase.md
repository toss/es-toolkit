# startCase (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `startCase`

由于处理 `null` 或 `undefined` 的规范化逻辑,此 `startCase` 函数运行速度较慢。

请改用更快、更现代的 `es-toolkit` 的 [startCase](../../string/startCase.md)。

:::

将字符串转换为 start case。

```typescript
const startCased = startCase(str);
```

## 参考

### `startCase(str)`

当您想将字符串转换为 Start Case 时,请使用 `startCase`。Start Case 是一种命名约定,每个单词的首字母大写并用空格分隔。

```typescript
import { startCase } from 'es-toolkit/compat';

// 转换普通字符串
startCase('hello world');
// 返回值: 'Hello World'

// 已经大写的单词保持不变
startCase('HELLO WORLD');
// 返回值: 'HELLO WORLD'

// 转换连字符分隔的字符串
startCase('hello-world');
// 返回值: 'Hello World'

// 转换下划线分隔的字符串
startCase('hello_world');
// 返回值: 'Hello World'
```

`null` 或 `undefined` 被视为空字符串。

```typescript
import { startCase } from 'es-toolkit/compat';

startCase(null); // ''
startCase(undefined); // ''
```

#### 参数

- `str` (`string`, 可选): 要转换为 start case 的字符串。

#### 返回值

(`string`): 返回转换为 start case 的字符串。
