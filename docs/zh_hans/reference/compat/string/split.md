# split (Lodash 兼容性)

::: warning 请使用 JavaScript 的 `String.prototype.split`

此 `split` 函数由于处理 `null` 或 `undefined` 而运行缓慢。

请使用更快、更现代的 JavaScript 的 `String.prototype.split`。

:::

使用分隔符将字符串拆分为数组。

```typescript
const segments = split(str, separator);
```

## 参考

### `split(string, separator?, limit?)`

当您想使用特定分隔符将字符串拆分为数组时,请使用 `split`。您还可以限制结果数组的最大长度。

```typescript
import { split } from 'es-toolkit/compat';

// 按连字符拆分
split('a-b-c', '-');
// 返回值: ['a', 'b', 'c']

// 限制结果数量
split('a-b-c-d', '-', 2);
// 返回值: ['a', 'b']

// 按正则表达式拆分
split('hello world', /\s/);
// 返回值: ['hello', 'world']
```

如果未指定分隔符,整个字符串将成为数组的第一个元素。

```typescript
import { split } from 'es-toolkit/compat';

split('hello');
// 返回值: ['hello']
```

`null` 或 `undefined` 被视为空字符串。

```typescript
import { split } from 'es-toolkit/compat';

split(null);
// 返回值: ['']

split(undefined);
// 返回值: ['']
```

#### 参数

- `string` (`string`, 可选): 要拆分的字符串。默认为空字符串。
- `separator` (`RegExp | string`, 可选): 用于拆分的分隔符。
- `limit` (`number`, 可选): 结果数组的最大长度。

#### 返回值

(`string[]`): 返回由分隔符拆分的字符串数组。
