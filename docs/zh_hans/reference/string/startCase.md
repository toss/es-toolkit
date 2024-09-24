# startCase

将字符串转换为 Start 大小写。

Start 大小写是一种命名约定，其中标识符中每个单词的首字母大写，其余字母小写，单词之间用空格分隔，例如 `Start Case`。

## 签名

```typescript
function startCase(str: string): string;
```

### 参数

- `str` (`string`): 需要转换为 Start 大小写的字符串。

### 返回值

(`string`) The string converted to start case.

## 示例

```typescript
import { startCase } from 'es-toolkit/string';

startCase('--foo-bar--'); // returns 'Foo Bar'
startCase('fooBar'); // returns 'Foo Bar'
startCase('__FOO_BAR__'); // returns 'Foo Bar'
startCase('XMLHttpRequest'); // returns 'Xml Http Request'
startCase('_abc_123_def'); // returns 'Abc 123 Def'
startCase('__abc__123__def__'); // returns 'Abc 123 Def'
startCase('_-_-_-_'); // returns ''
startCase('12abc 12ABC'); // returns '12 Abc 12 ABC'
```

## 演示

::: sandpack

```ts index.ts
import { startCase } from 'es-toolkit/string';

console.log(startCase('startCase'));
```

:::
