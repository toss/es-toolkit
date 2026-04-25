# replace (Lodash 兼容性)

::: warning 请使用 JavaScript 的 `String.prototype.replace`

由于处理非字符串值,此 `replace` 函数运行较慢。

请改用更快、更现代的 JavaScript 的 `String.prototype.replace`。

:::

将字符串中的匹配模式替换为其他字符串。

```typescript
const replaced = replace(target, pattern, replacement);
```

## 用法

### `replace(target, pattern, replacement)`

当您想在字符串中查找特定模式并替换为其他字符串时,请使用 `replace`。您可以使用字符串或正则表达式模式,替换内容可以指定为字符串或函数。

```typescript
import { replace } from 'es-toolkit/compat';

// 用字符串模式替换
replace('abcde', 'de', '123');
// Returns: 'abc123'

// 用正则表达式模式替换
replace('abcde', /[bd]/g, '-');
// Returns: 'a-c-e'
```

您也可以使用函数来动态决定替换内容。

```typescript
import { replace } from 'es-toolkit/compat';

// 用函数决定替换内容
replace('abcde', 'de', match => match.toUpperCase());
// Returns: 'abcDE'

// 正则表达式和函数的组合
replace('abcde', /[bd]/g, match => match.toUpperCase());
// Returns: 'aBcDe'
```

`null` 或 `undefined` 目标被视为空字符串。

```typescript
import { replace } from 'es-toolkit/compat';

replace(null, 'test', 'replaced');
// Returns: ''

replace(undefined, /test/g, 'replaced');
// Returns: ''
```

#### 参数

- `target` (`string`): 要替换的目标字符串。
- `pattern` (`string | RegExp`): 要查找的模式。
- `replacement` (`string | Function`): 替换内容。如果是函数,则接收匹配的字符串并应返回替换字符串。

#### 返回值

(`string`): 返回模式被替换的新字符串。
