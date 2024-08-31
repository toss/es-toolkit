# deburr

Converts a string by replacing special characters and diacritical marks with their ASCII equivalents. For example, `"Crème brûlée"` becomes `"Creme brulee"`.

## Signature

```typescript
function deburr(str: string): string;
```

### Parameters

- `str` (`string`): The input string to be deburred.

### Returns

(`string`): The deburred string with special characters replaced by their ASCII equivalents.

## Examples

```typescript
import { deburr } from 'es-toolkit/string';

deburr('déjà vu'); // returns 'deja vu'
deburr('Æthelred'); // returns 'Aethelred'
deburr('München'); // returns 'Munchen'
deburr('Crème brûlée'); // returns 'Creme brulee'
```
