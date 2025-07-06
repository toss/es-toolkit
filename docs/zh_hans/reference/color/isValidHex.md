# isValidHex

验证字符串是否为有效的十六进制颜色字符串。

该函数检查给定的字符串是否代表有效的十六进制颜色值。它接受3位和6位十六进制字符串，并且不区分大小写。输入不应包含"#"前缀。

## 签名

```typescript
function isValidHex(hex: string): boolean;
```

### 参数

- `hex` (`string`): 要验证的十六进制颜色字符串（不带"#"前缀）。应为3位或6位字符。

### 返回值

(`boolean`): 如果十六进制字符串有效则返回`true`，否则返回`false`。

## 示例

```typescript
import { isValidHex } from 'es-toolkit/color';

// 有效的6位十六进制字符串
isValidHex('ff0000'); // true (红色)
isValidHex('00ff00'); // true (绿色)
isValidHex('0000ff'); // true (蓝色)
isValidHex('ffffff'); // true (白色)
isValidHex('000000'); // true (黑色)
isValidHex('123456'); // true
isValidHex('abcdef'); // true

// 有效的3位十六进制字符串
isValidHex('f00'); // true (红色)
isValidHex('0f0'); // true (绿色)
isValidHex('00f'); // true (蓝色)
isValidHex('fff'); // true (白色)
isValidHex('000'); // true (黑色)
isValidHex('123'); // true
isValidHex('abc'); // true

// 大小写混合（有效）
isValidHex('FF0000'); // true
isValidHex('fF0000'); // true
isValidHex('aB12Cd'); // true
isValidHex('AbC'); // true

// 无效长度
isValidHex(''); // false
isValidHex('f'); // false
isValidHex('ff'); // false
isValidHex('ff00'); // false (4位)
isValidHex('ff000'); // false (5位)
isValidHex('ff00000'); // false (7位)

// 无效字符
isValidHex('gg0000'); // false
isValidHex('ff00xx'); // false
isValidHex('ff00!!'); // false
isValidHex('xyz'); // false
```
