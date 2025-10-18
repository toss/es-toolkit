# words (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `words`

由于需要处理 `null` 或 `undefined` 以及复杂的 Unicode 支持,此 `words` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [words](../../string/words.md)。

:::

将字符串拆分为单词数组。

```typescript
const wordArray = words(str, pattern);
```

## 参考

### `words(str, pattern)`

当您想要将字符串拆分为单词时,请使用 `words`。默认情况下,它会识别英文字母、数字、表情符号等来提取单词。

```typescript
import { words } from 'es-toolkit/compat';

// 基本单词提取
words('fred, barney, & pebbles');
// 返回: ['fred', 'barney', 'pebbles']

// 从驼峰命名中提取单词
words('camelCaseWord');
// 返回: ['camel', 'Case', 'Word']

// 包含数字的字符串
words('hello123world');
// 返回: ['hello', '123', 'world']
```

您还可以使用自定义模式提取单词。

```typescript
import { words } from 'es-toolkit/compat';

// 使用正则表达式提取单词
words('hello world', /\w+/g);
// 返回: ['hello', 'world']

// 使用字符串模式
words('one-two-three', '-');
// 返回: ['-']
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { words } from 'es-toolkit/compat';

words(null); // []
words(undefined); // []
```

#### 参数

- `str` (`string`, 可选): 要拆分为单词的字符串。
- `pattern` (`RegExp | string`, 可选): 用于匹配单词的模式。默认为内置的 Unicode 单词模式。

#### 返回值

(`string[]`): 返回提取的单词数组。
