# pascalCase

将字符串转换为帕斯卡命名法。

```typescript
const converted = pascalCase(str);
```

## 用法

### `pascalCase(str)`

当您想要将字符串转换为帕斯卡命名法时，请使用 `pascalCase`。帕斯卡命名法是一种命名规范，每个单词的首字母大写，单词之间不使用分隔符连接。

```typescript
import { pascalCase } from 'es-toolkit/string';

// 基本用法
pascalCase('pascalCase'); // 'PascalCase'
pascalCase('some whitespace'); // 'SomeWhitespace'

// 使用连字符或下划线连接的单词
pascalCase('hyphen-text'); // 'HyphenText'
pascalCase('snake_case'); // 'SnakeCase'

// 处理连续的大写字母
pascalCase('HTTPRequest'); // 'HttpRequest'
pascalCase('XMLHttpRequest'); // 'XmlHttpRequest'
```

它还能正确处理包含各种分隔符的字符串。

```typescript
import { pascalCase } from 'es-toolkit/string';

// 混合多种分隔符的情况
pascalCase('camelCase-with_mixed.separators'); // 'CamelCaseWithMixedSeparators'

// 包含数字的情况
pascalCase('version2.1.0'); // 'Version210'

// 包含特殊字符的情况
pascalCase('user@email.com'); // 'UserEmailCom'
```

#### 参数

- `str` (`string`): 要转换为帕斯卡命名法的字符串。

#### 返回值

(`string`): 返回转换为帕斯卡命名法的新字符串。

## 演示

::: sandpack

```ts index.ts
import { pascalCase } from 'es-toolkit/string';

console.log(pascalCase('pascalCase'));
```

:::
