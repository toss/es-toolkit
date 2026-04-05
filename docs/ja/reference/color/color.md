# color

ターミナル出力に色やスタイルを適用するオブジェクトです。環境に応じて色のサポート可否を自動的に検出します。

```typescript
import { color } from 'es-toolkit/color';

color.red('エラーが発生しました');
```

## なぜ es-toolkit/color なのか？

既存の色ライブラリ（picocolors など）の既知の問題を解決しています。

- **`FORCE_COLOR=0` バグ修正**: picocolors は `"0"` を truthy として扱い、色が有効になります。es-toolkit はスペック（force-color.org）に従い正しく無効化します。
- **安全な `process` アクセス**: Cloudflare Workers のように `process` が存在しない環境でもクラッシュせずに動作します。
- **CI パイプ出力処理**: stdout が TTY でない場合（パイプ、リダイレクト）、色を無効化します。picocolors は CI 環境でこれを無視します。
- **FORCE_COLOR/NO_COLOR スペック準拠**: 空文字列を「未設定」として正しく処理します。
- **拡張色サポート**: 256色、RGB、Hex 色をサポートします。picocolors は基本16色のみ対応しています。
- **`stripAnsi` 内蔵**: ANSI コードを除去するユーティリティを別パッケージなしで提供します。
- **背景色マルチライン処理**: 改行で背景色が崩れません。
- **TypeScript サポート**: 完全な型定義を提供します。
- **ESM/CJS デュアル**: Named export と CommonJS の両方をサポートします。

## 使い方

### 基本的な色とスタイル

```typescript
import { color } from 'es-toolkit/color';

// 前景色
color.red('赤いテキスト');
color.green('緑のテキスト');
color.blue('青いテキスト');
color.yellow('黄色いテキスト');

// スタイル
color.bold('太字テキスト');
color.dim('薄いテキスト');
color.italic('斜体テキスト');
color.underline('下線テキスト');
color.strikethrough('取り消し線テキスト');

// 背景色
color.bgRed('赤い背景');
color.bgGreen('緑の背景');
```

### 合成

複数のスタイルをネストして使用できます。

```typescript
import { color } from 'es-toolkit/color';

color.bold(color.red('太字の赤いテキスト'));
color.bgYellow(color.black('黄色い背景に黒いテキスト'));
```

### 拡張色

256色、RGB、Hex 色を使用できます。カリー化方式で、色の値を先に渡してからテキストを渡します。

```typescript
import { color } from 'es-toolkit/color';

// 256色パレット
color.ansi256(196)('明るい赤');
color.bgAnsi256(21)('青い背景');

// RGB
color.rgb(255, 128, 0)('オレンジ');
color.bgRgb(0, 255, 0)('緑の背景');

// Hex
color.hex('#ff00ff')('マゼンタ');
color.bgHex('#00ff00')('緑の背景');

// 短い Hex (#RGB)
color.hex('#f0f')('マゼンタ');
```

### 入力タイプ

すべての色関数はどのタイプでも受け取り、`String()` で変換します。chalk からマイグレーションする際に型エラーなく使用できます。

```typescript
color.red(123); // '123' (数値)
color.red(true); // 'true' (ブーリアン)
color.red(null); // 'null'
color.red(undefined); // 'undefined'
```

## 利用可能なスタイル

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
