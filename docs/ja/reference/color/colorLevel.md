# colorLevel

現在のターミナル環境の色サポートレベルを表す値です。

```typescript
import { colorLevel, isColorSupported } from 'es-toolkit/color';
```

## 使い方

### `colorLevel`

ターミナルがサポートする色のレベルを数値で返します。

| 値 | 意味 | 色数 |
|----|------|------|
| `0` | 色非サポート | - |
| `1` | 基本色 | 16色 |
| `2` | 256色 | 256色 |
| `3` | Truecolor | 1600万色 (RGB) |

```typescript
import { colorLevel } from 'es-toolkit/color';

if (colorLevel >= 2) {
  // 256色以上をサポートするターミナル
}
```

### `isColorSupported`

色出力が可能かどうかを示すブーリアン値です。`colorLevel > 0` と同じです。

```typescript
import { isColorSupported } from 'es-toolkit/color';

if (isColorSupported) {
  console.log('このターミナルは色をサポートしています');
}
```

## 検出順序

色のレベルは以下の順序で検出されます。

1. **FORCE_COLOR** — ユーザーが明示的に色のレベルを強制します。`"0"` なら無効化、`"1"`~`"3"` なら該当レベルに設定します。
2. **NO_COLOR** — ユーザーが明示的に色を無効化します。
3. **TTY 確認** — stdout がターミナルでない場合（パイプ、リダイレクトなど）、色を無効化します。
4. **Windows** — Windows Terminal（truecolor）と ConEmu を検出します。その他の Windows ターミナルは基本16色です。
5. **COLORTERM** — `truecolor` または `24bit` なら Truecolor として検出します。iTerm2、Alacritty などのターミナルが設定します。
6. **TERM** — `256color` が含まれていれば 256色として検出します。（例: `xterm-256color`）
7. **hasColors()** — Node.js 内蔵 API（11.13+）でターミナルの色能力を直接確認します。
8. **デフォルト** — TTY が確認された場合、基本16色です。

`FORCE_COLOR` と `NO_COLOR` は空文字列（`""`）のとき「未設定」として処理されます。これはそれぞれ [force-color.org](https://force-color.org/) と [no-color.org](https://no-color.org/) のスペックに従ったものです。
