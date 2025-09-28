# parseInt (Lodash compatibility)

::: warning Use `parseInt`

This `parseInt` function works slowly due to additional function calls.

Use the faster and more modern native `parseInt` instead.

:::

Converts a string to an integer.

```typescript
const result = parseInt(string, radix);
```

## Reference

### `parseInt(string, radix?)`

Use `parseInt` when you want to convert a string to an integer. You can specify a radix to interpret it in a different base.

```typescript
import { parseInt } from 'es-toolkit/compat';

// Basic decimal parsing
parseInt('123');
// Returns: 123

parseInt('08');
// Returns: 8

// Automatic hexadecimal recognition
parseInt('0x20');
// Returns: 32

// Explicit radix specification
parseInt('08', 10);
// Returns: 8

parseInt('0x20', 16);
// Returns: 32

parseInt('1010', 2);
// Returns: 10

// Use in arrays
['6', '08', '10'].map(parseInt);
// Returns: [6, 8, 10]
```

Invalid format strings return NaN.

```typescript
import { parseInt } from 'es-toolkit/compat';

parseInt('abc');
// Returns: NaN

parseInt('');
// Returns: NaN

parseInt('123abc');
// Returns: 123 (parses only the beginning)
```

#### Parameters

- `string` (`string`): The string to convert to an integer.
- `radix` (`number`, optional): The radix to use for conversion. Default is `0`, which automatically determines based on string format.

#### Returns

(`number`): Returns the converted integer. Returns NaN if conversion is not possible.
