# isValidHex

文字列が有効な16進数カラー文字列かどうかを検証します。

この関数は、与えられた文字列が有効な16進数カラー値を表すかどうかを確認します。3桁と6桁の16進数文字列の両方を許可し、大文字小文字を区別しません。入力には「#」プレフィックスを含めないでください。

## インターフェース

```typescript
function isValidHex(hex: string): boolean;
```

### パラメータ

- `hex` (`string`): 検証する16進数カラー文字列（「#」プレフィックスなし）。3桁または6桁である必要があります。

### 戻り値

(`boolean`): 16進数文字列が有効な場合は`true`、そうでない場合は`false`を返します。

## 例

```typescript
import { isValidHex } from 'es-toolkit/color';

// 有効な6桁16進数文字列
isValidHex('ff0000'); // true (赤)
isValidHex('00ff00'); // true (緑)
isValidHex('0000ff'); // true (青)
isValidHex('ffffff'); // true (白)
isValidHex('000000'); // true (黒)
isValidHex('123456'); // true
isValidHex('abcdef'); // true

// 有効な3桁16進数文字列
isValidHex('f00'); // true (赤)
isValidHex('0f0'); // true (緑)
isValidHex('00f'); // true (青)
isValidHex('fff'); // true (白)
isValidHex('000'); // true (黒)
isValidHex('123'); // true
isValidHex('abc'); // true

// 大文字小文字混合（有効）
isValidHex('FF0000'); // true
isValidHex('fF0000'); // true
isValidHex('aB12Cd'); // true
isValidHex('AbC'); // true

// 無効な長さ
isValidHex(''); // false
isValidHex('f'); // false
isValidHex('ff'); // false
isValidHex('ff00'); // false (4桁)
isValidHex('ff000'); // false (5桁)
isValidHex('ff00000'); // false (7桁)

// 無効な文字
isValidHex('gg0000'); // false
isValidHex('ff00xx'); // false
isValidHex('ff00!!'); // false
isValidHex('xyz'); // false
```
