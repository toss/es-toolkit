# colors

使用 ANSI 转义码包裹文本，为终端添加颜色和样式。

```typescript
import { colors } from 'es-toolkit/server';

console.log(colors.red('error'));
console.log(colors.bold(colors.cyan('hello')));
```

## 用法

`colors` 是一个汇集了 ANSI 样式函数的对象。每个函数接收一个字符串，返回用对应开闭转义码包裹后的字符串。

```typescript
import { colors } from 'es-toolkit/server';

colors.red('error');
colors.bold('emphasized');
colors.underline(colors.cyan('link'));
```

只有实际引用的样式才会被打包进产物，因此对 tree shaking 友好。

### 修饰符

`reset`, `bold`, `dim`, `italic`, `underline`, `inverse`, `hidden`, `strikethrough`

### 前景色

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`

### 高亮前景色

`blackBright`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

### 背景色

`bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`

### 高亮背景色

`bgBlackBright`, `bgRedBright`, `bgGreenBright`, `bgYellowBright`, `bgBlueBright`, `bgMagentaBright`, `bgCyanBright`, `bgWhiteBright`

### 扩展颜色

扩展颜色的辅助函数采用柯里化形式：先传入颜色值，再传入文本。

- `ansi256(code)` / `bgAnsi256(code)`：8 位（256 色）调色板，`code` 取 `0–255`。
- `rgb(r, g, b)` / `bgRgb(r, g, b)`：24 位真彩色。
- `hex(color)` / `bgHex(color)`：24 位真彩色，支持 `#RGB`、`#RRGGBB`，以及不带 `#` 的相同写法。

```typescript
import { colors } from 'es-toolkit/server';

const orange = colors.rgb(255, 99, 71);
console.log(orange('hello'));

console.log(colors.hex('#f06')('hello'));
console.log(colors.bgAnsi256(21)('hello'));
```

### 组合

嵌套调用时，内层样式关闭后会自动重新打开外层样式，因此外层的颜色会保持不变。

```typescript
import { colors } from 'es-toolkit/server';

console.log(colors.red(`error: ${colors.underline('not found')}, please retry`));
```

由于大多数终端会在换行处重置背景色，背景色辅助函数会在每个换行前后重新打开背景码。

```typescript
import { colors } from 'es-toolkit/server';

console.log(colors.bgYellow('line one\nline two'));
```

## 类型

返回样式函数的辅助函数 (`ansi256`、`bgAnsi256`、`rgb`、`bgRgb`、`hex`、`bgHex`) 都返回 `ColorFunction`。

```typescript
import type { ColorFunction } from 'es-toolkit/server';

type ColorFunction = (text: string) => string;
```

## 注意

`colors` 不会检测终端是否支持颜色 — 任何环境下都会无条件输出 ANSI 转义码。如果需要根据 `NO_COLOR`、`FORCE_COLOR`、TTY 判定或 CI 环境等条件切换输出，请在调用前自行判断。
