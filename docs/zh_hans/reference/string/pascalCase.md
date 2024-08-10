# pascalCase

将字符串转换为 Pascal 大小写。

Pascal 大小写是一种命名约定，其中每个单词都被大写并且没有任何分隔符字符。例如，`PascalCase`。

## 签名

```typescript
function pascalCase(str: string): string;
```

### 参数

- `str` (`string`): 需要转换为 Pascal 大小写的字符串。

### 返回值

(`string`): 转换为 Pascal 大小写的字符串。

## 示例

```typescript
import { pascalCase } from 'es-toolkit/string';

const convertedStr1 = pascalCase('pascalCase'); // returns 'PascalCase'
const convertedStr2 = pascalCase('some whitespace'); // returns 'SomeWhitespace'
const convertedStr3 = pascalCase('hyphen-text'); // returns 'HyphenText'
const convertedStr4 = pascalCase('HTTPRequest'); // returns 'HttpRequest'
```

## 演示

::: sandpack

```ts index.ts
import { pascalCase } from 'es-toolkit/string';

console.log(pascalCase('pascalCase'));
```

:::
