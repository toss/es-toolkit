# upperFirst

Converts the first character of string to upper case.

## Signature

```typescript
function upperFirst(str: string): string;
```

### Parameters

- `str` (`string`): The string that is to be changed.

### Returns

(`string`) The string converted.

## Examples

```typescript
import { upperFirst } from 'es-toolkit/string';

upperFirst('fred'); // returns 'Fred'
upperFirst('Fred'); // returns 'Fred'
upperFirst('FRED'); // returns 'FRED'
```
