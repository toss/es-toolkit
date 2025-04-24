# trimStart

移除字符串开头的空白字符或指定字符。

如果 `chars` 是一个字符串，它应该是一个单一字符。要删除多个字符，请提供一个数组。

## 签名

```typescript
function trimStart(str: string, chars?: string | string[]): string;
```

### 参数

- `str` (`string`): 将要去除开头字符的字符串。
- `chars` (`string | string[]`): 要从字符串开头删除的字符。

### 返回值

(`string`): 移除指定开头字符后的结果字符串。

## 示例

```typescript
const trimmedStr1 = trimStart('---hello', '-'); // returns 'hello'
const trimmedStr2 = trimStart('000123', '0'); // returns '123'
const trimmedStr3 = trimStart('abcabcabc', 'a'); // returns 'bcabcabc'
const trimmedStr4 = trimStart('xxxtrimmed', 'x'); // returns 'trimmed'
```
