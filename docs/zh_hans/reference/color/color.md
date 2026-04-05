# color

用于在终端输出中应用颜色和样式的对象。会根据环境自动检测是否支持颜色。

```typescript
import { color } from 'es-toolkit/color';

color.red('发生了错误');
```

## 为什么选择 es-toolkit/color？

解决了现有颜色库（如 picocolors）的已知问题。

- **修复 `FORCE_COLOR=0` 的 bug**：picocolors 将 `"0"` 视为 truthy，导致颜色被启用。es-toolkit 遵循规范（force-color.org）正确禁用颜色。
- **安全的 `process` 访问**：在 Cloudflare Workers 等没有 `process` 的环境中也不会崩溃。
- **CI 管道输出处理**：当 stdout 不是 TTY 时（管道、重定向），会禁用颜色。picocolors 在 CI 环境中忽略了这一点。
- **遵循 FORCE_COLOR/NO_COLOR 规范**：将空字符串正确处理为"未设置"。
- **扩展颜色支持**：支持 256 色、RGB、Hex 颜色。picocolors 仅支持基本 16 色。
- **内置 `stripAnsi`**：无需额外包即可提供移除 ANSI 代码的工具。
- **背景色多行处理**：换行时背景色不会中断。
- **TypeScript 支持**：提供完整的类型定义。
- **ESM/CJS 双支持**：同时支持 Named export 和 CommonJS。

## 用法

### 基本颜色和样式

```typescript
import { color } from 'es-toolkit/color';

// 前景色
color.red('红色文本');
color.green('绿色文本');
color.blue('蓝色文本');
color.yellow('黄色文本');

// 样式
color.bold('粗体文本');
color.dim('暗淡文本');
color.italic('斜体文本');
color.underline('下划线文本');
color.strikethrough('删除线文本');

// 背景色
color.bgRed('红色背景');
color.bgGreen('绿色背景');
```

### 组合

可以嵌套多个样式使用。

```typescript
import { color } from 'es-toolkit/color';

color.bold(color.red('粗体红色文本'));
color.bgYellow(color.black('黄色背景黑色文本'));
```

### 扩展颜色

可以使用 256 色、RGB、Hex 颜色。采用柯里化方式，先传入颜色值，再传入文本。

```typescript
import { color } from 'es-toolkit/color';

// 256 色调色板
color.ansi256(196)('亮红色');
color.bgAnsi256(21)('蓝色背景');

// RGB
color.rgb(255, 128, 0)('橙色');
color.bgRgb(0, 255, 0)('绿色背景');

// Hex
color.hex('#ff00ff')('品红色');
color.bgHex('#00ff00')('绿色背景');

// 短 Hex (#RGB)
color.hex('#f0f')('品红色');
```

### 输入类型

所有颜色函数接受任意类型，并通过 `String()` 进行转换。从 chalk 迁移时不会出现类型错误。

```typescript
color.red(123);       // '123' (数字)
color.red(true);      // 'true' (布尔值)
color.red(null);      // 'null'
color.red(undefined); // 'undefined'
```

## 可用样式

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
