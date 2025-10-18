# capitalize

将字符串的第一个字符转换为大写,其余字符转换为小写。

```typescript
const result = capitalize(str);
```

## 参考

### `capitalize(str)`

当您想将字符串的第一个字母转换为大写,其余字母统一为小写时,请使用 `capitalize`。在规范化姓名或标题时非常有用。

```typescript
import { capitalize } from 'es-toolkit/string';

// 基本用法
capitalize('hello'); // returns 'Hello'
capitalize('WORLD'); // returns 'World'
capitalize('javaScript'); // returns 'Javascript'
```

也能正确处理空字符串或单字符字符串。

```typescript
import { capitalize } from 'es-toolkit/string';

capitalize(''); // returns ''
capitalize('a'); // returns 'A'
capitalize('A'); // returns 'A'
```

可以用于规范化用户输入或创建标题。

```typescript
import { capitalize } from 'es-toolkit/string';

// 规范化用户姓名
const userName = 'john DOE';
const formattedName = userName.split(' ').map(capitalize).join(' ');
// returns 'John Doe'

// 创建标题
const title = capitalize('welcome to our website');
// returns 'Welcome to our website'
```

#### 参数

- `str` (`string`): 要将第一个字母转换为大写的字符串。

#### 返回值

(`string`): 返回第一个字母为大写,其余字母为小写的新字符串。
