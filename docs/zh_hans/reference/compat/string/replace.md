# replace

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

用替换字符串替换匹配的模式。

## 签名

```typescript
function replace(
  target: string,
  pattern: string | RegExp,
  replacement: string | ((substring: string, ...args: any[]) => string)
): string;
```

### 参数

- `target` (`string`): 目标字符串。
- `pattern` (`string | RegExp`): 要匹配的模式。
- `replacement` (`string | ((substring: string, ...args: any[]) => string)`): 替换字符串或返回替换字符串的函数。

### 返回值

(`string`): 用匹配模式替换后的新字符串。

## 示例

```typescript
replace('abcde', 'de', '123'); // 'abc123'
replace('abcde', /[bd]/g, '-'); // 'a-c-e'
replace('abcde', 'de', substring => substring.toUpperCase()); // 'abcDE'
replace('abcde', /[bd]/g, substring => substring.toUpperCase()); // 'aBcDe'
```
