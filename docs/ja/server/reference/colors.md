# colors

ANSI エスケープコードでテキストをラップし、ターミナルに色とスタイルを適用します。

```typescript
import { colors } from 'es-toolkit/server';

console.log(colors.red('error'));
console.log(colors.bold(colors.cyan('hello')));
```

## 使い方

`colors` は ANSI スタイル関数をまとめたオブジェクトです。各関数は文字列を受け取り、対応する開きコードと閉じコードでラップした文字列を返します。

```typescript
import { colors } from 'es-toolkit/server';

colors.red('error');
colors.bold('emphasized');
colors.underline(colors.cyan('link'));
```

実際に参照したスタイルだけがバンドルに含まれるため、ツリーシェイキングに適しています。

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

### 拡張カラー

拡張カラーのヘルパーはカリー化されています。先に色を渡してから、テキストを渡します。

- `ansi256(code)` / `bgAnsi256(code)`: 8 ビット (256 色) パレット。`code` は `0–255`。
- `rgb(r, g, b)` / `bgRgb(r, g, b)`: 24 ビットトゥルーカラー。
- `hex(color)` / `bgHex(color)`: 24 ビットトゥルーカラー。`#RGB`、`#RRGGBB`、または `#` なしの同形式を受け付けます。

```typescript
import { colors } from 'es-toolkit/server';

const orange = colors.rgb(255, 99, 71);
console.log(orange('hello'));

console.log(colors.hex('#f06')('hello'));
console.log(colors.bgAnsi256(21)('hello'));
```

### 合成

入れ子の呼び出しでは、内側のスタイルが閉じた後に外側のスタイルを再オープンするため、外側の色がそのまま続きます。

```typescript
import { colors } from 'es-toolkit/server';

console.log(colors.red(`error: ${colors.underline('not found')}, please retry`));
```

ほとんどのターミナルは改行ごとに背景色をリセットするため、背景色のヘルパーは改行をまたぐたびに背景コードを再オープンします。

```typescript
import { colors } from 'es-toolkit/server';

console.log(colors.bgYellow('line one\nline two'));
```

## 型

スタイル関数を返すヘルパー (`ansi256`、`bgAnsi256`、`rgb`、`bgRgb`、`hex`、`bgHex`) は `ColorFunction` を返します。

```typescript
import type { ColorFunction } from 'es-toolkit/server';

type ColorFunction = (text: string) => string;
```

## 補足

`colors` はターミナルがカラーに対応しているかを検出しません。どのような環境でも常に ANSI エスケープコードを出力します。`NO_COLOR`、`FORCE_COLOR`、TTY 判定、CI 環境などに応じて出力を切り替えたい場合は、呼び出し側で環境を確認してください。
