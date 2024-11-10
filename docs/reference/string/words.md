# words

The words function splits a string into an array of words. It can recognize both ASCII and Unicode characters as words.

## Signature

```ts
function words(str: string, pattern?: RegExp | string): string[];
```

### Parameters

- `str` (`string`): The string to split into words.
- `pattern` (`RegExp | string, 선택 사항`): A custom pattern to split the string. If not provided, a default regular expression is used.

### Returns

(`string[]`): An array of words extracted from the string.

## Examples

```typescript
const result1 = words('fred, barney, & pebbles');
// => ['fred', 'barney', 'pebbles']

const result2 = words('fred, barney, & pebbles', /[^, ]+/g);
// => ['fred', 'barney', '&', 'pebbles']
```
