# camelCase

将字符串转换为驼峰命名法(Camel case)。

```typescript
const result = camelCase(str);
```

## 参考

### `camelCase(str)`

当您想将字符串转换为驼峰命名法时,请使用 `camelCase`。驼峰命名法是一种命名规则,第一个单词以小写字母开头,其余单词的首字母大写并连接在一起。

```typescript
import { camelCase } from 'es-toolkit/string';

// 将各种形式的字符串转换为驼峰命名法
camelCase('hello world'); // returns 'helloWorld'
camelCase('some-hyphen-text'); // returns 'someHyphenText'
camelCase('CONSTANT_CASE'); // returns 'constantCase'
camelCase('PascalCase'); // returns 'pascalCase'
camelCase('mixed   SpAcE'); // returns 'mixedSpace'
```

将包含特殊字符、空格、连字符等分隔符的字符串转换为适合用作JavaScript变量名或对象属性名的形式。

```typescript
import { camelCase } from 'es-toolkit/string';

// 转换从API响应中接收的键
const apiKey = 'user_first_name';
const jsKey = camelCase(apiKey); // 'userFirstName'

// 将HTML属性转换为JavaScript属性
const cssProperty = 'background-color';
const jsProperty = camelCase(cssProperty); // 'backgroundColor'
```

也会保留Unicode字符。

```typescript
import { camelCase } from 'es-toolkit/string';

camelCase('keep unicode 😅'); // returns 'keepUnicode😅'
camelCase('한글-테스트'); // returns '한글테스트'
```

#### 参数

- `str` (`string`): 要转换为驼峰命名法的字符串。

#### 返回值

(`string`): 返回转换为驼峰命名法的新字符串。
