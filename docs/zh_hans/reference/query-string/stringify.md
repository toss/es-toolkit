# stringify

将对象转换为 URL 查询字符串。

```typescript
const search = stringify(query);
```

## 用法

### `stringify(query)`

需要在 URL 中包含搜索词或页码等值时，请使用 `stringify`。结果以 `?` 开头，例如 `?page=1&q=hello`，可以直接拼接在 `/items` 这样的路径后面。如果没有可转换的值，则返回空字符串。

```typescript
import { stringify } from 'es-toolkit/query-string';

// 将对象转换为查询字符串。
stringify({ page: 1, q: 'hello world' });
// 返回 '?page=1&q=hello%20world'

// 数组中的每个元素使用相同的键。保留空字符串，忽略空数组。
stringify({ tags: ['a', 'b'], q: '', ids: [] });
// 返回 '?tags=a&tags=b&q='

// 将结果拼接在路径后面。忽略值为 null 或 undefined 的条目。
`/items${stringify({ page: 1, ref: undefined })}`;
// 返回 '/items?page=1'

// 所有值都被忽略时会返回空字符串，因此路径保持不变。
`/items${stringify({ ref: undefined })}`;
// 返回 '/items'
```

数组中的 `null` 和 `undefined` 也会被忽略。其余值使用 `String()` 转换为字符串。

键和值使用 `encodeURIComponent` 编码。空格转换为 `%20`，`+` 转换为 `%2B`。

将嵌套对象或 `Date` 作为值传入时，TypeScript 类型检查会报错。请先用 `JSON.stringify()` 或 `toISOString()` 将这些值转换为字符串。

如果不需要开头的 `?`，请对结果调用 `.slice(1)`。

#### 参数

- `query` (`T`): 要转换为查询字符串的对象。每个值必须是字符串、数字、布尔值、`bigint`、`null`、`undefined`，或由这些值组成的数组。

#### 返回值

(`string`): 以 `?` 开头的查询字符串。如果没有可转换的值，则返回空字符串。

#### 错误

(`URIError`): 当键或值中包含未配对的 UTF-16 代理项时抛出错误，例如 `'😀'.slice(0, 1)`。
