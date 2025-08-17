# capitalize

Converts the first character of string to upper case and the remaining to lower case.

## Signature

```typescript
function capitalize<T extends string>(str: T): Capitalize<T>;
```

### Parameters

`str` (`T`): The string to be transformed.

### Returns

(`Capitalize<T>`): The string with the first character capitalized and the rest in lowercase.

## Examples

```typescript
import { capitalize } from 'es-toolkit/string';

capitalize('fred'); // returns 'Fred'
capitalize('FRED'); // returns 'Fred'
```
