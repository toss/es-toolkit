# colorLevel

表示当前终端环境的颜色支持级别。

```typescript
import { colorLevel, isColorSupported } from 'es-toolkit/color';
```

## 用法

### `colorLevel`

以数字形式返回终端支持的颜色级别。

| 值  | 含义       | 颜色数          |
| --- | ---------- | --------------- |
| `0` | 不支持颜色 | -               |
| `1` | 基本颜色   | 16 色           |
| `2` | 256 色     | 256 色          |
| `3` | Truecolor  | 1600 万色 (RGB) |

```typescript
import { colorLevel } from 'es-toolkit/color';

if (colorLevel >= 2) {
  // 支持 256 色及以上的终端
}
```

### `isColorSupported`

表示是否支持颜色输出的布尔值。等同于 `colorLevel > 0`。

```typescript
import { isColorSupported } from 'es-toolkit/color';

if (isColorSupported) {
  console.log('此终端支持颜色');
}
```

## 检测顺序

颜色级别按以下顺序进行检测：

1. **FORCE_COLOR** — 用户显式强制颜色级别。`"0"` 表示禁用，`"1"`~`"3"` 表示设置为对应级别。
2. **NO_COLOR** — 用户显式禁用颜色。
3. **TTY 检查** — 如果 stdout 不是终端（管道、重定向等），则禁用颜色。
4. **Windows** — 检测 Windows Terminal（truecolor）和 ConEmu。其他 Windows 终端默认为 16 色。
5. **COLORTERM** — 如果为 `truecolor` 或 `24bit`，则检测为 Truecolor。iTerm2、Alacritty 等终端会设置此值。
6. **TERM** — 如果包含 `256color`，则检测为 256 色。（例如：`xterm-256color`）
7. **hasColors()** — 使用 Node.js 内置 API（11.13+）直接检查终端颜色能力。
8. **默认值** — 如果确认为 TTY，则默认为 16 色。

`FORCE_COLOR` 和 `NO_COLOR` 在值为空字符串（`""`）时被视为"未设置"。这分别遵循了 [force-color.org](https://force-color.org/) 和 [no-color.org](https://no-color.org/) 规范。
