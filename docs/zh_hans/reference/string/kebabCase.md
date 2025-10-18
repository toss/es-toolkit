# kebabCase

将字符串转换为短横线命名法。

```typescript
const result = kebabCase(str);
```

## 参考

### `kebabCase(str)`

当您想将字符串转换为短横线命名法时，请使用 `kebabCase`。短横线命名法是一种命名约定，其中每个单词都以小写字母书写，并用短横线（-）连接。

```typescript
import { kebabCase } from 'es-toolkit/string';

// 将驼峰命名法转换为短横线命名法
kebabCase('camelCase');
// 结果：'camel-case'

// 转换带有空格的字符串
kebabCase('some whitespace');
// 结果：'some-whitespace'

// 保持已经是短横线命名法的字符串不变
kebabCase('hyphen-text');
// 结果：'hyphen-text'

// 转换包含大写字母的字符串
kebabCase('HTTPRequest');
// 结果：'http-request'
```

此函数在创建 API 端点、CSS 类名、HTML 属性等时非常有用。

#### 参数

- `str` (`string`)：要转换为短横线命名法的字符串。

#### 返回值

(`string`)：转换为短横线命名法的字符串。
