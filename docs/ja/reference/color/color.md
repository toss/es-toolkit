# color

ANSI エスケープコードでターミナルの色とスタイルを適用します。

すべてのユーティリティは個別の named export として、また default export としてもバンドルされています。色関数は常に ANSI エスケープコードを出力します。non-TTY 出力、ログファイル、ANSI 非対応環境などでコードを取り除きたい場合は、結果を `stripColor` で包んでください。

```typescript
// 個別の named import（ツリーシェイキング可能）:
import { bold, hex, red } from 'es-toolkit/color';
// または default バンドル:
import color from 'es-toolkit/color';

color.red('エラー');
```

## 利用可能なユーティリティ

### 修飾子

`reset`, `bold`, `dim`, `italic`, `underline`, `inverse`, `hidden`, `strikethrough`

### 前景色

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`

### 明るい前景色

`blackBright`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

### 背景色

`bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`

### 明るい背景色

`bgBlackBright`, `bgRedBright`, `bgGreenBright`, `bgYellowBright`, `bgBlueBright`, `bgMagentaBright`, `bgCyanBright`, `bgWhiteBright`

### 拡張色

`ansi256(code)`, `bgAnsi256(code)`, `rgb(r, g, b)`, `bgRgb(r, g, b)`, `hex(color)`, `bgHex(color)`

## 使い方

### 基本的な色とスタイル

```typescript
import { bgYellow, black, blue, bold, green, red, underline } from 'es-toolkit/color';

red('赤いテキスト');
green('緑のテキスト');
blue('青いテキスト');

bold('太字テキスト');
underline('下線テキスト');

bgYellow(black('黄色い背景に黒いテキスト'));
```

### 合成

複数のスタイルをネストして使用できます。inner が閉じた後に outer が自動的に再オープンされるため、続くテキストも色が保持されます。

```typescript
import { bold, red } from 'es-toolkit/color';

bold(red('太字の赤いテキスト'));
red(`状態: ${bold('重要')} — 確認してください`);
```

### 色コードの除去

non-TTY 出力（ログファイル、パイプ、ANSI 非対応の CI）では、結果を `stripColor` で包んで ANSI エスケープコードを取り除けます。

```typescript
import { red, stripColor } from 'es-toolkit/color';

stripColor(red('プレーンテキスト')); // 'プレーンテキスト'
```

### 拡張色

256色、RGB、Hex 色はカリー化方式です。色の値を先に渡してからテキストを渡します。

```typescript
import { ansi256, bgAnsi256, bgHex, bgRgb, hex, rgb } from 'es-toolkit/color';

ansi256(196)('明るい赤');
bgAnsi256(21)('青い背景');

rgb(255, 128, 0)('オレンジ');
bgRgb(0, 255, 0)('緑の背景');

hex('#ff00ff')('マゼンタ');
hex('#f0f')('マゼンタ'); // 短い形式
bgHex('#00ff00')('緑の背景');
```

### 入力タイプ

すべての色関数は `string` を受け取ります。他の値は渡す前に変換してください。

```typescript
import { red } from 'es-toolkit/color';

red(String(42)); // '42'
red(JSON.stringify({ a: 1 }));
```
