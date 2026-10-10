# stringify (用于查询字符串)

根据对象生成拼接在 URL 末尾的查询字符串。结果以 `?` 开头,例如 `?a=1&b=2`。

```typescript
const search = stringify(query);
```

## 用法

### `stringify(query)`

当您需要给 URL 加上查询参数时,请使用 `stringify`。结果以 `?` 开头,可以直接拼接在路径后面。

```typescript
import { stringify } from 'es-toolkit/query-string';

// 根据对象生成查询字符串。
stringify({ page: 1, q: 'hello world' });
// 返回 '?page=1&q=hello%20world'

// 数组会重复使用同一个键。空字符串会保留,空数组会被忽略。
stringify({ tags: ['a', 'b'], q: '', ids: [] });
// 返回 '?tags=a&tags=b&q='

// 拼接在路径后面。值为 `null` 或 `undefined` 的键会被忽略。
`/items${stringify({ page: 1, ref: undefined })}`;
// 返回 '/items?page=1'

// 没有任何可添加的值时,路径保持不变。
`/items${stringify({ ref: undefined })}`;
// 返回 '/items'
```

键和值使用 `encodeURIComponent` 编码。空格会变成 `%20`,`+` 会变成 `%2B`,因此无论用 `URLSearchParams` 还是 `decodeURIComponent` 读取结果,得到的值都一样。

值为对象或 `Date` 时会产生类型错误。请先用 `JSON.stringify()` 或 `toISOString()` 转换成字符串再传入。

如果不需要开头的 `?`,请对结果调用 `.slice(1)`。

#### 参数

- `query` (`T`): 要生成查询字符串的对象。每个值必须是字符串、数字、布尔值、`BigInt`、`null`、`undefined`,或由它们组成的数组。

#### 返回值

(`string`): 以 `?` 开头的查询字符串。没有可添加的值时返回空字符串。

#### 错误

(`URIError`): 当键或值中包含像 `'😀'.slice(0, 1)` 这样被截断的字符时抛出。
