# trimEnd

删除字符串末尾的空白或指定字符。

## 签名

```typescript
function trimEnd(str: string, chars?: string | string[]): string;
```

### 参数

- `str` (`string`): 要从中删除末尾字符的字符串。
- `chars` (`string | string[]`): 要从字符串末尾删除的字符。

### 返回值

(`string`): 指定末尾字符被删除后的字符串。

## 示例

```typescript
const trimmedStr1 = trimEnd('hello---', '-'); // returns 'hello'
const trimmedStr2 = trimEnd('123000', '0'); // returns '123'
const trimmedStr3 = trimEnd('abcabcabc', 'c'); // returns 'abcabcab'
const trimmedStr4 = trimEnd('trimmedxxx', 'x'); // returns 'trimmed'
```
