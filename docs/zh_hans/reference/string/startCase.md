# startCase

将字符串中每个单词的首字母转换为大写。

```typescript
const converted = startCase(str);
```

## 参考

### `startCase(str)`

当您想要将字符串转换为起始大写格式(每个单词的首字母大写)时,请使用 `startCase`。它将每个单词的首字母大写,其余字母转换为小写,并用空格连接单词。

```typescript
import { startCase } from 'es-toolkit/string';

// 基本用法
startCase('hello world'); // 'Hello World'
startCase('HELLO WORLD'); // 'Hello World'

// 转换驼峰命名或帕斯卡命名
startCase('fooBar'); // 'Foo Bar'
startCase('PascalCase'); // 'Pascal Case'

// 用连字符或下划线连接的单词
startCase('hello-world'); // 'Hello World'
startCase('hello_world'); // 'Hello World'
```

它还能正确处理包含各种分隔符和特殊字符的字符串。

```typescript
import { startCase } from 'es-toolkit/string';

// 包含多个分隔符的情况
startCase('--foo-bar--'); // 'Foo Bar'
startCase('__FOO_BAR__'); // 'Foo Bar'

// 处理连续大写字母和数字
startCase('XMLHttpRequest'); // 'Xml Http Request'
startCase('_abc_123_def'); // 'Abc 123 Def'

// 空字符串或只有无意义分隔符的情况
startCase('_-_-_-_'); // ''
startCase('12abc 12ABC'); // '12 Abc 12 ABC'
```

#### 参数

- `str` (`string`): 要转换为起始大写格式的字符串。

#### 返回值

(`string`): 返回一个新字符串,每个单词的首字母大写并用空格连接。

## 演示

::: sandpack

```ts index.ts
import { startCase } from 'es-toolkit/string';

console.log(startCase('startCase'));
```

:::
