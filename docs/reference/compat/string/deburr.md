# deburr (Lodash compatibility)

::: warning Use `deburr` from `es-toolkit`

This `deburr` function operates slower due to handling non-string input values.

Instead, use the faster and more modern [deburr](../../string/deburr.md) from `es-toolkit`.

:::

Converts special characters and diacritical marks in a string to ASCII characters.

```typescript
const result = deburr(str);
```

## Usage

### `deburr(str)`

Converts special characters and diacritical marks in a string to ASCII characters. This is useful for making multilingual text easier to search or sort.

```typescript
import { deburr } from 'es-toolkit/compat';

deburr('Æthelred'); // 'Aethelred'
deburr('München'); // 'Munchen'
deburr('Crème brûlée'); // 'Creme brulee'
```

Non-string values are also converted to strings before processing.

```typescript
import { deburr } from 'es-toolkit/compat';

deburr(123); // '123'
deburr(null); // ''
deburr(undefined); // ''
```

#### Parameters

- `str` (`string`, optional): The string to remove special characters from.

#### Returns

(`string`): Returns the string with special characters and diacritical marks converted to ASCII characters.
