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

upperCase('fred') // returns 'fred'
upperCase('Fred') // returns 'Fred'
upperCase('FRED') // returns 'FRED'
```