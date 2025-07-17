# truncate

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Truncates a string if it's longer than the given maximum string length. The last characters of the truncated string are replaced with the omission string which defaults to "...".

## Signature

```typescript
function truncate(
  string: string,
  options?: {
    length?: number;
    separator?: string | RegExp;
    omission?: string;
  }
): string;
```

### Parameters

- `string` (`string`): The string to truncate.
- `options` (`Object`, optional): The options object.
  - `length` (`number`, optional): The maximum string length. Defaults to `30`.
  - `omission` (`string`, optional): The string to indicate text is omitted. Defaults to `'...'`.
  - `separator` (`RegExp|string`, optional): The separator pattern to truncate to.

### Returns

(`string`): The truncated string.

## Examples

```typescript
const test = 'hi-diddly-ho there, neighborino';

truncate(test);
// => 'hi-diddly-ho there, neighbo...'

truncate(test, { length: 24, separator: ' ' });
// => 'hi-diddly-ho there,...'

truncate(test, { length: 24, separator: /,? +/ });
// => 'hi-diddly-ho there...'

truncate(test, { omission: ' [...]' });
// => 'hi-diddly-ho there, neig [...]'

truncate('ABC', { length: 3 });
// => 'ABC'

truncate('ABC', { length: 2 });
// => '...'

truncate('¥§✈✉🤓', { length: 5 });
// => '¥§✈✉🤓'

truncate('¥§✈✉🤓', { length: 4, omission: '…' });
// => '¥§✈…'
```
