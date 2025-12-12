# endsWith (Lodash compatibility)

::: warning Use JavaScript's `String.prototype.endsWith`

This `endsWith` function operates slower due to handling `null` or `undefined`.

Instead, use the faster and more modern JavaScript's `String.prototype.endsWith`.

:::

Checks if a string ends with a given target string.

```typescript
const result = endsWith(str, target);
```

## Usage

### `endsWith(str, target, position?)`

Use `endsWith` when you want to check if a string ends with a specific string. You can also specify the position to search up to.

```typescript
import { endsWith } from 'es-toolkit/compat';

// Check string ending
endsWith('fooBar', 'Bar');
// Returns: true

endsWith('fooBar', 'foo');
// Returns: false

// Check up to a specific position
endsWith('fooBar', 'foo', 3);
// Returns: true (checks if first 3 characters 'foo' ends with 'foo')
```

`null` or `undefined` returns `false`.

```typescript
import { endsWith } from 'es-toolkit/compat';

endsWith(null, 'test');
// Returns: false

endsWith('test', null);
// Returns: false
```

#### Parameters

- `str` (`string`, optional): The string to search in.
- `target` (`string`, optional): The string to search for at the end.
- `position` (`number`, optional): The position to end the search. Defaults to the full length of the string.

#### Returns

(`boolean`): Returns `true` if the string ends with the target string, otherwise `false`.
