# truncate (Lodash 兼容性)

::: warning 请使用 JavaScript 的 `String.prototype.slice`

由于复杂的 Unicode 处理和正则表达式检查,此 `truncate` 函数运行较慢。

请改用更快、更现代的 JavaScript 的 `String.prototype.slice`。

:::

如果字符串长度超过指定的最大长度,则截断字符串并附加省略字符串。

```typescript
const truncated = truncate(str, options);
```

## 参考

### `truncate(string, options?)`

当您想要将长字符串截断到指定长度时,请使用 `truncate`。截断部分将替换为省略字符串(默认值: `"..."`)。

```typescript
import { truncate } from 'es-toolkit/compat';

// 基本用法 (最大 30 个字符)
truncate('hi-diddly-ho there, neighborino');
// 返回: 'hi-diddly-ho there, neighbo...'

// 指定长度
truncate('hi-diddly-ho there, neighborino', { length: 24 });
// 返回: 'hi-diddly-ho there, n...'

// 更改省略字符串
truncate('hi-diddly-ho there, neighborino', { omission: ' [...]' });
// 返回: 'hi-diddly-ho there, neig [...]'
```

您可以指定分隔符以在该位置截断。

```typescript
import { truncate } from 'es-toolkit/compat';

// 使用空格分隔符在单词边界处截断
truncate('hi-diddly-ho there, neighborino', {
  length: 24,
  separator: ' ',
});
// 返回: 'hi-diddly-ho there,...'

// 使用正则表达式指定分隔符
truncate('hi-diddly-ho there, neighborino', {
  length: 24,
  separator: /,? +/,
});
// 返回: 'hi-diddly-ho there...'
```

Unicode 字符也能正确处理。

```typescript
import { truncate } from 'es-toolkit/compat';

truncate('¥§✈✉🤓', { length: 5 });
// 返回: '¥§✈✉🤓'

truncate('¥§✈✉🤓', { length: 4, omission: '…' });
// 返回: '¥§✈…'
```

#### 参数

- `string` (`string`, 可选): 要截断的字符串。
- `options` (`object`, 可选): 选项对象。
  - `options.length` (`number`, 可选): 最大字符串长度。默认值为 `30`。
  - `options.omission` (`string`, 可选): 表示文本被省略的字符串。默认值为 `'...'`。
  - `options.separator` (`RegExp | string`, 可选): 决定截断位置的分隔符模式。

#### 返回值

(`string`): 返回截断后的字符串。
