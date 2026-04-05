# stripAnsi

从字符串中移除所有 ANSI 颜色/样式代码。

```typescript
import { color, stripAnsi } from 'es-toolkit/color';

const colored = color.red('hello');
stripAnsi(colored);
// Returns: 'hello'
```

## 用法

### `stripAnsi(text)`

从带有颜色的字符串中移除 ANSI 转义代码，只返回纯文本。在将日志保存到文件或精确测量字符串长度时非常有用。

```typescript
import { color, stripAnsi } from 'es-toolkit/color';

const message = color.bold(color.red('发生错误'));

// 保存到文件时移除 ANSI 代码
fs.writeFileSync('log.txt', stripAnsi(message));

// 测量字符串长度
const visibleLength = stripAnsi(message).length;
```

移除本库生成的所有 SGR（Select Graphic Rendition）序列，包括基本颜色、256 色、RGB 等。

#### 参数

- `text` (`string`)：可能包含 ANSI 代码的字符串。

#### 返回值

(`string`)：返回移除了 ANSI 代码的字符串。
