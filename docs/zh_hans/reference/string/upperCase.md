# upperCase

将字符串转换为大写格式。

大写格式是一种命名约定，其中每个单词都以大写字母写入，并用空格 ` ` 分隔。例如，`UPPER CASE`。

## 签名

```typescript
function upperCase(str: string): string;
```

### 参数

- `str` (`string`): 要转换为大写的字符串。

### 返回值

(`string`): 转换为大写的字符串。

## 示例

```typescript
const convertedStr1 = upperCase('camelCase'); // returns 'CAMEL CASE'
const convertedStr2 = upperCase('some whitespace'); // returns 'SOME WHITESPACE'
const convertedStr3 = upperCase('hyphen-text'); // returns 'HYPHEN TEXT'
const convertedStr4 = upperCase('HTTPRequest'); // returns 'HTTP REQUEST'
```
