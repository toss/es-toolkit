# rgbToHex

将RGB颜色值转换为十六进制颜色字符串。

该函数接受RGB颜色值并将其转换为十六进制颜色字符串。每个RGB分量应该是0到255（包含）之间的整数。

## 签名

```typescript
function rgbToHex(r: number, g: number, b: number): string;
```

### 参数

- `r` (`number`): 红色分量。必须是0到255之间的整数。
- `g` (`number`): 绿色分量。必须是0到255之间的整数。
- `b` (`number`): 蓝色分量。必须是0到255之间的整数。

### 返回值

(`string`): RGB值的十六进制颜色字符串表示，带有"#"前缀。

### 抛出异常

如果任何RGB值不是整数或超出0-255范围，则抛出错误。

## 示例

```typescript
import { rgbToHex } from 'es-toolkit/color';

// 基本颜色
rgbToHex(255, 0, 0); // '#ff0000' (红色)
rgbToHex(0, 255, 0); // '#00ff00' (绿色)
rgbToHex(0, 0, 255); // '#0000ff' (蓝色)

// 其他颜色
rgbToHex(255, 255, 255); // '#ffffff' (白色)
rgbToHex(0, 0, 0); // '#000000' (黑色)
rgbToHex(255, 165, 0); // '#ffa500' (橙色)

// 边界情况
rgbToHex(0, 0, 0); // '#000000'
rgbToHex(255, 255, 255); // '#ffffff'

// 错误情况
rgbToHex(256, 0, 0); // throws Error: Invalid RGB value
rgbToHex(-1, 0, 0); // throws Error: Invalid RGB value
rgbToHex(1.5, 0, 0); // throws Error: Invalid RGB value
```
