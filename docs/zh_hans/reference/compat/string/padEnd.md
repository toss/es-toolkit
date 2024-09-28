# padEnd

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

在字符串的末尾使用给定的字符进行填充，直到它达到指定的长度。

如果指定的长度小于或等于原字符串的长度，或者填充字符为空字符串，则返回原字符串不变。

## 签名

```typescript
function padEnd(str: string, length = 0, chars = ' '): string;
```

### 参数

- `str` (`string`): 要填充的字符串。
- `length` (`number`): 填充后的字符串长度。默认值为 `0`。
- `char` (`string`): 用于填充字符串的字符。默认值为 `' '`。

### 返回值

返回一个新的字符串，该字符串用指定的字符填充，直到达到指定的长度。

## 示例

```javascript
padEnd('hello', 10, 'a'); // 'helloaaaaa'
padEnd('hello', 3, 'a'); // 'hello'
padEnd('hello', 5, ''); // 'hello'
```
