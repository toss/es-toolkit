# escapeRegExp

Escapes the RegExp special characters `"^"`, `"$"`, `"\\"`, `"."`, `"\*"`, `"+"`, `"?"`, `"("`, `")"`, `"["`, `"]"`, `"{"`, `"}"`, and `"|"` in `str`.

## Signature

```typescript
function escapeRegExp(str: string): string;
```

### Parameters

- `str` (`string`): The string to escape.

### Returns

(`string`): The escaped string.

## Examples

```typescript
import { escapeRegExp } from 'es-toolkit/string';

escapeRegExp('[es-toolkit](https://es-toolkit.slash.page/)'); // returns '\[es-toolkit\]\(https://es-toolkit\.slash\.page/\)'
```
