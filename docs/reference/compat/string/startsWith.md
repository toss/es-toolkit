# startsWith

::: info
This is fully compatible with lodash in our [compatibility library](../../../compatibility.md), `es-toolkit/compat`.
:::

Checks if a string contains another string at the beginning of the string.

Checks if one string startsWith another string. Optional position parameter to start searching from a certain index.

## Signature

```typescript
function startsWith(str: string, target: string, position: number = 0): string;
```

### Parameters

- `str` (`string`): The string that will be searched.
- `target` (`string`): The string that it should contain at the start.
- `position` (`number`, optional): Optional: offset to start searching in the str string.

### Returns

(`boolean`) Whether or not the str string starts with the target string

## Examples

```typescript
import { startsWith } from 'es-toolkit/string';

startsWith('fooBar', 'foo') // returns true
startsWith('fooBar', 'Bar') // returns false
startsWith('fooBar', 'abcdef') // returns false
startsWith('fooBar', 'Bar', 3) // returns true
```
