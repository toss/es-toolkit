# color

文字列を ANSI エスケープコードで包んで色とスタイルを適用します。

```typescript
import { red } from 'es-toolkit/color';

red('エラー');
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

各ユーティリティは個別の named export として取り込むことも、default export のバンドルとして使うこともできます。個別 import はツリーシェイキング可能なので、実際に使った色だけがバンドルに含まれます。

```typescript
// 個別 import（ツリーシェイキング可能）
import { bold, hex, red } from 'es-toolkit/color';
// または default バンドル
import color from 'es-toolkit/color';

color.red('エラー');
```

### 基本的な色とスタイル

色関数は `string` を受け取り、ANSI エスケープコードを埋め込んだ文字列を返します。このコードをターミナルが読み取って色とスタイルとして表示します。

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

スタイルは自由にネストできます。内側のスタイルが文字列の途中で終わっても、外側のスタイルはその後のテキストにそのまま続きます。手動で再適用する必要はありません。

```typescript
import { bold, red } from 'es-toolkit/color';

bold(red('太字の赤いテキスト'));
red(`状態: ${bold('重要')} — 確認してください`);
```

### 拡張色

256色、RGB、Hex は2段階で呼び出します。まず色を渡して関数を作り、その関数にテキストを渡します。

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

## 参考

### 環境による自動検出は提供していません

一般的な色ユーティリティは `NO_COLOR`、`FORCE_COLOR`、`isTTY` などの環境変数を確認し、状況に応じて ANSI エスケープコードを出力から取り除くことがあります。私たちはこのような動作が必要な場面はエッジケースと判断し、サポートのためにモジュール読み込み時の副作用（環境変数の読み取りやターミナル能力の検査）や、関数ごとに増えていく分岐を避けるために自動検出を採用しませんでした。

色が表示されない出力先（例: ログファイルへの書き込み）には、最終的な文字列から ANSI コードを取り除く方向を推奨します。
