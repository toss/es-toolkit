# words

Splits a string into an array of words. It can recognize both ASCII and Unicode characters as words.

## Signature

```ts
function words(str: string): string[];
```

### Parameters

- `str` (`string`): The string to split into words.

### Returns

(`string[]`): An array of words extracted from the string.

## Examples

```typescript
words('fred, barney, & pebbles');
// => ['fred', 'barney', 'pebbles']

words('camelCaseHTTPRequest🚀');
// => ['camel', 'Case', 'HTTP', 'Request', '🚀']

words('Lunedì 18 Set');
// => ['Lunedì', '18', 'Set']
```

## Lodash Compatibility

To ensure full compatibility with lodash, you can import `words` from `es-toolkit/compat`.

- `words` also takes an optional second parameter, `pattern`, which allows you to define custom patterns for splitting the string.
- `words` will automatically convert the first argument to a string if it isn't one already.

```typescript
import { words } from 'es-toolkit/compat';

words('fred, barney, & pebbles', /[^, ]+/g);
// Returns ['fred', 'barney', '&', 'pebbles']
```
