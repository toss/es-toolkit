# replace

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Replaces the matched pattern with the replacement string.

## Signature

```typescript
function replace(
  target: string,
  pattern: string | RegExp,
  replacement: string | ((substring: string, ...args: any[]) => string)
): string;
```

### Parameters

- `target` (`string`): The target string.
- `pattern` (`string | RegExp`): The pattern to match.
- `replacement` (`string | ((substring: string, ...args: any[]) => string)`): The replacement string or a function that returns the replacement string.

### Returns

(`string`): The new string with the matched pattern replaced.

## Examples

```typescript
replace('abcde', 'de', '123'); // 'abc123'
replace('abcde', /[bd]/g, '-'); // 'a-c-e'
replace('abcde', 'de', substring => substring.toUpperCase()); // 'abcDE'
replace('abcde', /[bd]/g, substring => substring.toUpperCase()); // 'aBcDe'
```
