# color

带自动颜色支持检测的终端颜色和样式。

每个工具都以独立的 named export 暴露，同时也打包在 default export 中。每个函数都会自动检测终端是否支持 ANSI 颜色 —— 在不支持的环境（non-TTY、`NO_COLOR=1`、管道、没有 `FORCE_COLOR` 的 CI）中，每次调用都会原样返回输入文本。

```typescript
// 独立的 named import（可 tree-shaking）:
import { red, bold, hex } from 'es-toolkit/color';

// 或 default 打包:
import color from 'es-toolkit/color';
color.red('错误');
```

## 可用工具

### 修饰符

`reset`, `bold`, `dim`, `italic`, `underline`, `inverse`, `hidden`, `strikethrough`

### 前景色

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`

### 亮前景色

`blackBright`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

### 背景色

`bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`

### 亮背景色

`bgBlackBright`, `bgRedBright`, `bgGreenBright`, `bgYellowBright`, `bgBlueBright`, `bgMagentaBright`, `bgCyanBright`, `bgWhiteBright`

### 扩展颜色

`ansi256(code)`, `bgAnsi256(code)`, `rgb(r, g, b)`, `bgRgb(r, g, b)`, `hex(color)`, `bgHex(color)`

## 用法

### 基本颜色和样式

```typescript
import { red, green, blue, bold, underline, bgYellow, black } from 'es-toolkit/color';

red('红色文本');
green('绿色文本');
blue('蓝色文本');

bold('粗体文本');
underline('下划线文本');

bgYellow(black('黄色背景黑色文本'));
```

### 组合

可以嵌套多个样式。内层样式关闭后外层样式会自动重新打开,因此后续文本会保持其颜色。

```typescript
import { red, bold } from 'es-toolkit/color';

bold(red('粗体红色文本'));
red(`状态: ${bold('重要')} — 请查看`);
```

### 扩展颜色

256 色、RGB、Hex 采用柯里化方式:先传入颜色值,再传入文本。

```typescript
import { ansi256, bgAnsi256, rgb, bgRgb, hex, bgHex } from 'es-toolkit/color';

ansi256(196)('亮红色');
bgAnsi256(21)('蓝色背景');

rgb(255, 128, 0)('橙色');
bgRgb(0, 255, 0)('绿色背景');

hex('#ff00ff')('品红色');
hex('#f0f')('品红色'); // 短形式
bgHex('#00ff00')('绿色背景');
```

### 输入类型

所有颜色函数接受 `string`。请在传入前转换其他类型。

```typescript
import { red } from 'es-toolkit/color';

red(String(42)); // '42'
red(JSON.stringify({ a: 1 }));
```
