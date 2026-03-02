# reverseString

反转字符串。

```typescript
const reversed = reverseString(value);
```

## 用法

### `reverseString(value)`

当您想要反转字符串中的字符顺序时,请使用 `reverseString`。它可以正确处理 Unicode 字符和表情符号。

```typescript
import { reverseString } from 'es-toolkit/string';

// 基本字符串反转
reverseString('hello'); // 'olleh'
reverseString('world'); // 'dlrow'

// 混合大小写字符串
reverseString('PascalCase'); // 'esaClacsaP'

// 包含空格的字符串
reverseString('hello world'); // 'dlrow olleh'
```

它可以准确处理表情符号和特殊字符。

```typescript
import { reverseString } from 'es-toolkit/string';

// 包含表情符号的字符串
reverseString('foo 😄 bar'); // 'rab 😄 oof'
reverseString('안녕하세요'); // '요세하녕안'

// 数字和特殊字符
reverseString('12345'); // '54321'
reverseString('a-b-c'); // 'c-b-a'
```

#### 参数

- `value` (`string`): 要反转的字符串。

#### 返回值

(`string`): 返回一个字符顺序反转的新字符串。

## 演示

::: sandpack

```ts index.ts
import { reverseString } from 'es-toolkit';

console.log(reverseString('hello'));
```

:::
