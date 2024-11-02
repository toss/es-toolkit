# endsWith

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if a string contains another string at the end of the string.

Checks if one string ends with another string. Optional position parameter to search up the this position.

## Signature

```typescript
function endsWith(str: string, target: string, position: number = 0): string;
```

### Parameters

- `str` (`string`): The string that will be searched.
- `target` (`string`): The string that it should contain at the end.
- `position` (`number`, optional): The position to search up to this character position.

### Returns

(`boolean`): Whether or not the `str` string ends with the `target` string

## Examples

```typescript
import { endsWith } from 'es-toolkit/compat';

endsWith('fooBar', 'foo'); // returns false
endsWith('fooBar', 'Bar'); // returns true
endsWith('fooBar', 'abcdef'); // returns false
endsWith('fooBar', 'foo', 3); // returns true
```
