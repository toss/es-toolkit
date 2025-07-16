# truncate

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::
如果字符串超过给定的最大长度，则会截断字符串。截断的字符串的最后部分将替换为表示省略的字符串。省略字符串的默认值为 `"..."`。

## 签名

```typescript
function truncate(
  string: string,
  options?: {
    length?: number;
    separator?: string | RegExp;
    omission?: string;
  }
): string;
```

### 参数

- `string` (`string`): 要截断的字符串。
- `options` (`Object`, 可选): 选项对象。
  - `length` (`number`, 可选): 最大字符串长度。默认值为 `30`。
  - `omission` (`string`, 可选): 表示文本被省略的字符串。默认值为 `'...'`。
  - `separator` (`RegExp|string`, 可选): 决定截断位置的分隔符模式。

### 返回值

(`string`): 截断后的字符串。

## 示例

```typescript
const test = 'hi-diddly-ho there, neighborino';

truncate(test);
// => 'hi-diddly-ho there, neighbo...'

truncate(test, { length: 24, separator: ' ' });
// => 'hi-diddly-ho there,...'

truncate(test, { length: 24, separator: /,? +/ });
// => 'hi-diddly-ho there...'

truncate(test, { omission: ' [...]' });
// => 'hi-diddly-ho there, neig [...]'

truncate('ABC', { length: 3 });
// => 'ABC'

truncate('ABC', { length: 2 });
// => '...'

truncate('¥§✈✉🤓', { length: 5 });
// => '¥§✈✉🤓'

truncate('¥§✈✉🤓', { length: 4, omission: '…' });
// => '¥§✈…'
```
