# capitalize

Converts the first character of string to upper case and the remaining to lower case.

## Signature

```typescript
function capitalize(str: string): Capitalize<string>;
```

### Parameters

`str` (`string`): The string to be converted to uppercase.

### Returns

(`Capitalize<string>`): The capitalized string.

## Examples

```typescript
import { capitalize } from 'es-toolkit/string';

capitalize('fred'); // returns 'Fred'
capitalize('FRED'); // returns 'Fred'
```
