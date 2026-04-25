# color

用 ANSI 转义码为字符串添加颜色和样式。

```typescript
import { red } from 'es-toolkit/color';

red('错误');
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

### 导入

每个工具都可以通过单独的 named export 导入，也可以通过 default export 作为打包后的整体使用。单独的 import 支持 tree-shaking，所以最终的包里只会包含你实际用到的颜色。

```typescript
// 单独 named import（支持 tree-shaking）
import { bold, hex, red } from 'es-toolkit/color';
// 或 default 打包
import color from 'es-toolkit/color';

color.red('错误');
```

### 基本颜色和样式

颜色函数接受一个 `string`，返回嵌入了 ANSI 转义码的字符串。终端读取这些转义码并把它们渲染成颜色和样式。

```typescript
import { bgYellow, black, blue, bold, green, red, underline } from 'es-toolkit/color';

red('红色文本');
green('绿色文本');
blue('蓝色文本');

bold('粗体文本');
underline('下划线文本');

bgYellow(black('黄色背景黑色文本'));
```

### 组合

可以自由嵌套样式。内层样式在字符串中途结束后，外层样式会自动延续到剩余文本上 —— 不需要手动重新应用。

```typescript
import { bold, red } from 'es-toolkit/color';

bold(red('粗体红色文本'));
red(`状态: ${bold('重要')} — 请查看`);
```

### 扩展颜色

256 色、RGB、Hex 分两步调用：先传入颜色得到一个函数，再把文本传给该函数。

```typescript
import { ansi256, bgAnsi256, bgHex, bgRgb, hex, rgb } from 'es-toolkit/color';

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

## 说明

### 不提供环境自动检测

一般的颜色工具会检查 `NO_COLOR`、`FORCE_COLOR`、`isTTY` 等环境变量，根据情况从输出中移除 ANSI 转义码。我们认为需要这种行为的场景属于边缘情况，为了避免在模块加载时产生副作用（读取环境变量、探测终端能力）以及在每个颜色函数中不断增加分支，所以没有引入自动检测。

对于不会显示颜色的输出目的地（例如写入日志文件），建议从最终字符串中移除 ANSI 码。独立的 `stripAnsi` 工具正在规划中。如果你急需，请提交 issue，我们会尽快响应。
