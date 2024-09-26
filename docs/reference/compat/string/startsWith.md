# startsWith

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
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
- `position` (`number`, optional): The offset to start searching in the str string.

### Returns

(`boolean`) Whether or not the str string starts with the target string

## Examples

```typescript
import { startsWith } from 'es-toolkit/compat';

startsWith('fooBar', 'foo'); // returns true
startsWith('fooBar', 'Bar'); // returns false
startsWith('fooBar', 'abcdef'); // returns false
startsWith('fooBar', 'Bar', 3); // returns true
```
