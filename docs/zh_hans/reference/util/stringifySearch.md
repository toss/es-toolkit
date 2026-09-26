# stringifySearch

将对象转换为拼接在 URL 后面的 `?a=1&b=2` 形式的字符串。

```typescript
const search = stringifySearch(query);
```

## 用法

### `stringifySearch(query)`

当你想给 URL 添加查询参数时,请使用 `stringifySearch`。它返回以 `?` 开头的字符串,因此可以直接拼接在路径后面。没有需要添加的值时,返回空字符串。

```typescript
import { stringifySearch } from 'es-toolkit/util';

// 将对象转换为查询字符串。
stringifySearch({ page: 1, q: 'hello world' });
// 返回 '?page=1&q=hello%20world'

// 拼接在路径后面。值为 `undefined` 的键会被省略。
`/items${stringifySearch({ page: 1, ref: undefined })}`;
// 返回 '/items?page=1'

// 没有需要添加的值时,路径保持不变。
`/items${stringifySearch({ ref: undefined })}`;
// 返回 '/items'
```

各个值的转换方式如下。

| 值                     | 输入                        | 结果                  |
| ---------------------- | --------------------------- | --------------------- |
| 字符串                 | `{ q: 'a b+c' }`            | `'?q=a%20b%2Bc'`      |
| 空字符串               | `{ q: '' }`                 | `'?q='`               |
| 数字、布尔值、`BigInt` | `{ page: 1, open: true }`   | `'?page=1&open=true'` |
| `null`、`undefined`    | `{ a: null, b: undefined }` | `''`                  |
| 数组                   | `{ tags: ['a', 'b'] }`      | `'?tags=a&tags=b'`    |
| 空数组                 | `{ tags: [] }`              | `''`                  |

键和值使用 `encodeURIComponent` 编码。空格变为 `%20`,`+` 变为 `%2B`,因此无论用 `URLSearchParams` 还是 `decodeURIComponent` 读取结果,得到的值都相同。

不支持对象中嵌套的对象和 `Date`,传入会产生类型错误。请先用 `JSON.stringify()` 或 `toISOString()` 等方式将其转换为字符串。

如果只需要不带开头 `?` 的查询字符串,请使用 `.slice(1)`。

```typescript
import { stringifySearch } from 'es-toolkit/util';

// 去掉开头的 `?`。
stringifySearch({ page: 1 }).slice(1);
// 返回 'page=1'
```

#### 参数

- `query` (`T`): 要转换的对象。每个值必须是字符串、数字、布尔值、`BigInt`、`null`、`undefined`,或由它们组成的数组。

#### 返回值

(`string`): 以 `?` 开头的字符串。没有需要添加的值时返回空字符串。

#### 错误

(`URIError`): 当键或值中包含像被切成一半的表情符号这样的残缺字符时抛出错误。
