# reverseString

反转字符串。

此函数接收一个字符串作为输入，并返回该字符串的反转形式。

## 签名

```typescript
function reverseString(value: string): string;
```

### 参数

- `value` (`string`): 要反转的字符串。

### 返回值

(`string`): 反转后的字符串。

## 示例

```typescript
import { reverseString } from 'es-toolkit/string';

const reversedStr1 = reverseString('hello'); // returns 'olleh'
const reversedStr2 = reverseString('PascalCase'); // returns 'esaClaP'
const reversedStr3 = reverseString('foo 😄 bar'); // returns 'rab 😄 oof'
```

## 演示

::: sandpack

```ts index.ts
import { reverseString } from 'es-toolkit';

console.log(reverseString('hello'));
```

:::
