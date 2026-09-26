# stringifySearch

Converts an object into a string like `?a=1&b=2` to append to a URL.

```typescript
const search = stringifySearch(query);
```

## Usage

### `stringifySearch(query)`

Use `stringifySearch` when you want to add query parameters to a URL. It returns a string that starts with `?`, so you can append it to a path as is. When there is nothing to add, it returns an empty string.

```typescript
import { stringifySearch } from 'es-toolkit/util';

// Convert an object into a query string.
stringifySearch({ page: 1, q: 'hello world' });
// Returns: '?page=1&q=hello%20world'

// Append it to a path. `undefined` values are left out.
`/items${stringifySearch({ page: 1, ref: undefined })}`;
// Returns: '/items?page=1'

// When there is nothing to add, the path stays the same.
`/items${stringifySearch({ ref: undefined })}`;
// Returns: '/items'
```

Each value is converted as follows.

| Value                     | Input                       | Result                |
| ------------------------- | --------------------------- | --------------------- |
| String                    | `{ q: 'a b+c' }`            | `'?q=a%20b%2Bc'`      |
| Empty string              | `{ q: '' }`                 | `'?q='`               |
| Number, boolean, `BigInt` | `{ page: 1, open: true }`   | `'?page=1&open=true'` |
| `null`, `undefined`       | `{ a: null, b: undefined }` | `''`                  |
| Array                     | `{ tags: ['a', 'b'] }`      | `'?tags=a&tags=b'`    |
| Empty array               | `{ tags: [] }`              | `''`                  |

Keys and values are encoded with `encodeURIComponent`. Spaces become `%20` and `+` becomes `%2B`, so you get the same value whether you read the result with `URLSearchParams` or `decodeURIComponent`.

Nested objects and `Date` are not supported and cause a type error. Convert them to strings first, for example with `JSON.stringify()` or `toISOString()`.

When you need the query without the leading `?`, use `.slice(1)`.

```typescript
import { stringifySearch } from 'es-toolkit/util';

// Remove the leading `?`.
stringifySearch({ page: 1 }).slice(1);
// Returns: 'page=1'
```

#### Parameters

- `query` (`T`): The object to convert. Each value must be a string, number, boolean, `BigInt`, `null`, `undefined`, or an array of them.

#### Returns

(`string`): A string that starts with `?`, or an empty string when there is nothing to add.

#### Throws

(`URIError`): Throws when a key or value contains a broken character, such as half of an emoji.
