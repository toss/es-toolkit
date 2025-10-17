# startsWith (Lodash compatibility)

::: warning Use JavaScript's `String.prototype.startsWith`

This `startsWith` function is slower due to handling `null` or `undefined`.

Use the faster and more modern JavaScript's `String.prototype.startsWith` instead.

:::

Checks if a string starts with a given string.

```typescript
const result = startsWith(str, target);
```

## Reference

### `startsWith(str, target, position?)`

Use `startsWith` when you want to check if a string starts with a specific string. You can also specify the position to start the search.

```typescript
import { startsWith } from 'es-toolkit/compat';

// Check if string starts with target
startsWith('fooBar', 'foo');
// Returns: true

startsWith('fooBar', 'bar');
// Returns: false

// Check from a specific position
startsWith('fooBar', 'Bar', 3);
// Returns: true (checks if it starts with 'Bar' from position 3)
```

Returns `false` for `null` or `undefined`.

```typescript
import { startsWith } from 'es-toolkit/compat';

startsWith(null, 'test');
// Returns: false

startsWith('test', null);
// Returns: false
```

#### Parameters

- `str` (`string`, optional): The string to check.
- `target` (`string`, optional): The string to search for at the start.
- `position` (`number`, optional): The position to start the search. Defaults to `0`.

#### Returns

(`boolean`): Returns `true` if the string starts with the given string, otherwise `false`.
