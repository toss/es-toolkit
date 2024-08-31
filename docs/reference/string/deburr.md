# deburr

Deburrs `str` by converting [Latin-1 Supplement](<https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table>) and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A) letters to basic Latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).

## Signature

```typescript
function deburr(str: string): string;
```

### Parameters

- `str` (`string`): The string to deburr.

### Returns

(`string`) The deburred string.

## Examples

```typescript
import { deburr } from 'es-toolkit/string';

deburr('déjà vu'); // returns 'deja vu'
```
