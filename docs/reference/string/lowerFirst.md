# lowerFirst

Converts the first character of string to lower case.

## Signature

```typescript
function lowerFirst(str: string): string;
```

### Parameters

- `str` (`string`): The string that is to be changed.

### Returns

(`string`) The string converted.

## Examples

```typescript
import { lowerFirst } from 'es-toolkit/string';

lowerFirst('fred'); // returns 'fred'
lowerFirst('Fred'); // returns 'fred'
lowerFirst('FRED'); // returns 'fRED'
```
