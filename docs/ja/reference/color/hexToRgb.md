# hexToRgb

16進数のカラー文字列をRGBカラー値に変換します。

この関数は16進数のカラー文字列（「#」プレフィックスありまたはなし）を受け取り、RGBカラー値に変換します。3桁の短縮形16進数カラー（例：「#f00」）と6桁の16進数カラー（例：「#ff0000」）の両方をサポートします。

## インターフェース

```typescript
function hexToRgb(hex: string): RgbColor;

interface RgbColor {
  r: number;
  g: number;
  b: number;
}
```

### パラメータ

- `hex` (`string`): 16進数のカラー文字列。「#」プレフィックスがあってもなくても構いません。3桁（「#f00」）と6桁（「#ff0000」）の両方の形式をサポートします。

### 戻り値

(`RgbColor`): RGBカラー値を含むオブジェクトを返します。

- `r` (`number`): 赤色成分 (0-255)
- `g` (`number`): 緑色成分 (0-255)
- `b` (`number`): 青色成分 (0-255)

### エラー

16進数文字列が無効な場合、エラーをスローします。

## 例

```typescript
import { hexToRgb } from 'es-toolkit/color';

// #プレフィックス付きの6桁16進数
hexToRgb('#ff0000'); // { r: 255, g: 0, b: 0 }
hexToRgb('#00ff00'); // { r: 0, g: 255, b: 0 }
hexToRgb('#0000ff'); // { r: 0, g: 0, b: 255 }

// #プレフィックスなしの6桁16進数
hexToRgb('ff0000'); // { r: 255, g: 0, b: 0 }
hexToRgb('ffffff'); // { r: 255, g: 255, b: 255 }
hexToRgb('000000'); // { r: 0, g: 0, b: 0 }

// 3桁16進数（短縮形）
hexToRgb('#f00'); // { r: 255, g: 0, b: 0 }
hexToRgb('#0f0'); // { r: 0, g: 255, b: 0 }
hexToRgb('00f'); // { r: 0, g: 0, b: 255 }

// 大文字小文字混合
hexToRgb('#FfA500'); // { r: 255, g: 165, b: 0 }

// エラーケース
hexToRgb('#gg0000'); // throws Error: Invalid hex color string
hexToRgb('#ff00'); // throws Error: Invalid hex color string
hexToRgb(''); // throws Error: Invalid hex color string
```
