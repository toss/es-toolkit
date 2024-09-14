# trim

去除字符串开头和结尾的空格或指定字符。

## 签名

```typescript
function trim(str: string, chars?: string | string[]): string;
```

### 参数

- `str` (`string`): 要修剪字符的字符串。
- `chars` (`string | string[]`): 要从字符串中删除的字符。可以是单个字符或字符数组。

### 返回值

(`string`): 删除指定字符后的结果字符串。

## 示例

```typescript
trim('  hello  '); // "hello"
trim('--hello--', '-'); // "hello"
trim('##hello##', ['#', 'o']); // "hell"
```
