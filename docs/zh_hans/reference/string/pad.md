# pad

填充字符串的左侧和右侧，如果字符串的长度小于指定长度。如果填充字符不能被均匀分配到指定长度，则会被截断。

如果指定的长度小于或等于原始字符串的长度，或者填充字符为空字符串，则返回原始字符串不变。

## 签名

```typescript 
function pad(str: string, length: number, chars = ' '): string;
```

### 参数

- `str` (`string`): 需要填充的字符串。
- `length` (`number`): 填充后的字符串长度。
- `chars` (`string`): 用于填充的字符。默认为`' '`。

### 返回值

(`string`): 返回填充后的字符串。

## 示例

```typescript
pad('abc', 8); // => ' abc '

pad('abc', 8, '-'); // => '-abc_-_'

pad('abc', 3); // => 'abc'
```