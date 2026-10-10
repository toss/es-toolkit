# stringify

Converts an object into a URL query string.

```typescript
const search = stringify(query);
```

## Usage

### `stringify(query)`

Use `stringify` to include values such as search terms or page numbers in a URL. The result starts with `?`, such as `?page=1&q=hello`, so you can append it directly to a path like `/items`. It returns an empty string when there are no values to serialize.

```typescript
import { stringify } from 'es-toolkit/query-string';

// Convert an object into a query string.
stringify({ page: 1, q: 'hello world' });
// Returns: '?page=1&q=hello%20world'

// Each array element repeats the key. Empty strings are kept, and empty arrays are omitted.
stringify({ tags: ['a', 'b'], q: '', ids: [] });
// Returns: '?tags=a&tags=b&q='

// Append the result to a path. Entries with null or undefined values are omitted.
`/items${stringify({ page: 1, ref: undefined })}`;
// Returns: '/items?page=1'

// When all values are omitted, the empty result leaves the path unchanged.
`/items${stringify({ ref: undefined })}`;
// Returns: '/items'
```

`null` and `undefined` are also omitted inside arrays. Other values are converted to strings with `String()`.

Keys and values are encoded with `encodeURIComponent`. Spaces become `%20` and `+` becomes `%2B`.

Passing nested objects or `Date` values causes a TypeScript type-checking error. Convert them to strings first, for example with `JSON.stringify()` or `toISOString()`.

To remove the leading `?`, call `.slice(1)` on the result.

#### Parameters

- `query` (`T`): The object to convert into a query string. Each value must be a string, number, boolean, `bigint`, `null`, `undefined`, or an array of these values.

#### Returns

(`string`): A query string that starts with `?`, or an empty string when there are no values to serialize.

#### Throws

(`URIError`): Throws when a key or value contains an unpaired UTF-16 surrogate, such as `'😀'.slice(0, 1)`.
