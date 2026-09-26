# stringifySearch

Converts an object into a query string to append to a URL, such as `?a=1&b=2`.

```typescript
const search = stringifySearch(query);
```

## Usage

### `stringifySearch(query)`

Use `stringifySearch` when you want to add query parameters to a URL. The result starts with `?`, so you can append it to a path as is.

```typescript
import { stringifySearch } from 'es-toolkit/util';

// Convert an object into a query string.
stringifySearch({ page: 1, q: 'hello world' });
// Returns: '?page=1&q=hello%20world'

// Arrays repeat the key. Empty strings are kept, and empty arrays are left out.
stringifySearch({ tags: ['a', 'b'], q: '', ids: [] });
// Returns: '?tags=a&tags=b&q='

// Append it to a path. Keys whose value is `null` or `undefined` are left out.
`/items${stringifySearch({ page: 1, ref: undefined })}`;
// Returns: '/items?page=1'

// When there is nothing to add, the path stays the same.
`/items${stringifySearch({ ref: undefined })}`;
// Returns: '/items'
```

Keys and values are encoded with `encodeURIComponent`. Spaces become `%20` and `+` becomes `%2B`, so you get the same value whether you read the result with `URLSearchParams` or `decodeURIComponent`.

Objects and `Date` values cause a type error. Convert them to strings first, for example with `JSON.stringify()` or `toISOString()`.

To get the query without the leading `?`, call `.slice(1)` on the result.

#### Parameters

- `query` (`T`): The object to convert. Each value must be a string, number, boolean, `BigInt`, `null`, `undefined`, or an array of them.

#### Returns

(`string`): A query string that starts with `?`, or an empty string when there is nothing to add.

#### Throws

(`URIError`): Throws when a key or value contains a character cut in half, such as `'😀'.slice(0, 1)`.
