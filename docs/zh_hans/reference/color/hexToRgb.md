# hexToRgb

将十六进制颜色字符串转换为RGB颜色值。

该函数接受一个十六进制颜色字符串（带或不带"#"前缀），并将其转换为RGB颜色值。它支持3位简写十六进制颜色（例如：'#f00'）和6位十六进制颜色（例如：'#ff0000'）。

## 签名

```typescript
function hexToRgb(hex: string): RgbColor;

interface RgbColor {
  r: number;
  g: number;
  b: number;
}
```

### 参数

- `hex` (`string`): 十六进制颜色字符串。可以包含或不包含"#"前缀。支持3位（'#f00'）和6位（'#ff0000'）格式。

### 返回值

(`RgbColor`): 包含RGB颜色值的对象。

- `r` (`number`): 红色分量 (0-255)
- `g` (`number`): 绿色分量 (0-255)
- `b` (`number`): 蓝色分量 (0-255)

### 抛出异常

如果十六进制字符串无效，则抛出错误。

## 示例

```typescript
import { hexToRgb } from 'es-toolkit/color';

// 带#前缀的6位十六进制
hexToRgb('#ff0000'); // { r: 255, g: 0, b: 0 }
hexToRgb('#00ff00'); // { r: 0, g: 255, b: 0 }
hexToRgb('#0000ff'); // { r: 0, g: 0, b: 255 }

// 不带#前缀的6位十六进制
hexToRgb('ff0000'); // { r: 255, g: 0, b: 0 }
hexToRgb('ffffff'); // { r: 255, g: 255, b: 255 }
hexToRgb('000000'); // { r: 0, g: 0, b: 0 }

// 3位十六进制（简写形式）
hexToRgb('#f00'); // { r: 255, g: 0, b: 0 }
hexToRgb('#0f0'); // { r: 0, g: 255, b: 0 }
hexToRgb('00f'); // { r: 0, g: 0, b: 255 }

// 大小写混合
hexToRgb('#FfA500'); // { r: 255, g: 165, b: 0 }

// 错误情况
hexToRgb('#gg0000'); // throws Error: Invalid hex color string
hexToRgb('#ff00'); // throws Error: Invalid hex color string
hexToRgb(''); // throws Error: Invalid hex color string
```
