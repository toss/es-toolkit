# rgbToHex

RGBカラー値を16進数のカラー文字列に変換します。

この関数はRGBカラー値を受け取り、16進数のカラー文字列に変換します。各RGB成分は0から255（包含）の間の整数である必要があります。

## インターフェース

```typescript
function rgbToHex(r: number, g: number, b: number): string;
```

### パラメータ

- `r` (`number`): 赤色成分。0から255の間の整数である必要があります。
- `g` (`number`): 緑色成分。0から255の間の整数である必要があります。
- `b` (`number`): 青色成分。0から255の間の整数である必要があります。

### 戻り値

(`string`): RGB値の16進数カラー文字列表現。「#」プレフィックスが付きます。

### エラー

RGB値のいずれかが整数でないか、0-255の範囲外の場合、エラーをスローします。

## 例

```typescript
import { rgbToHex } from 'es-toolkit/color';

// 基本色
rgbToHex(255, 0, 0); // '#ff0000' (赤)
rgbToHex(0, 255, 0); // '#00ff00' (緑)
rgbToHex(0, 0, 255); // '#0000ff' (青)

// その他の色
rgbToHex(255, 255, 255); // '#ffffff' (白)
rgbToHex(0, 0, 0); // '#000000' (黒)
rgbToHex(255, 165, 0); // '#ffa500' (オレンジ)

// 境界ケース
rgbToHex(0, 0, 0); // '#000000'
rgbToHex(255, 255, 255); // '#ffffff'

// エラーケース
rgbToHex(256, 0, 0); // throws Error: Invalid RGB value
rgbToHex(-1, 0, 0); // throws Error: Invalid RGB value
rgbToHex(1.5, 0, 0); // throws Error: Invalid RGB value
```
