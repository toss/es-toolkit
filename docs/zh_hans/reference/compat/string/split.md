# split

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

将输入的字符串按指定的分隔符（`separator`）进行分割，并返回一个包含分割片段的新数组。

## 签名

```typescript
function split(string: string): string[];
function split(string: string, separator: RegExp | string): string[];
function split(string: string, separator: RegExp | string, limit: number): string[];
```

## 参数

- `string` (`string`): 要分割的字符串。
- `separator` (`RegExp|string`): 用于分割的分隔符模式。
- `limit` (`number`): 结果数组的最大长度。

## 返回值

- (`string[]`): 返回分割后的字符串片段数组。

## 示例

```js
// 通过字符分割字符串
split('a-b-c', '-');
// => ['a', 'b', 'c']

// 使用长度限制分割字符串
split('a-b-c', '-', 2);
// => ['a', 'b']

// 使用正则表达式模式分割字符串
split('abcde', /[bd]/);
// => ['a', 'c', 'e']

// 将字符串分割成单个字符
split('abc', '');
// => ['a', 'b', 'c']
```
