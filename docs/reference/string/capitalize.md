# capitalize

Converts the first character of a string to uppercase and the remaining characters to lowercase.

```typescript
const result = capitalize(str);
```

## Reference

### `capitalize(str)`

Use `capitalize` when you want to make only the first letter uppercase and convert the rest to lowercase. It's useful for normalizing names or titles.

```typescript
import { capitalize } from 'es-toolkit/string';

// Basic usage
capitalize('hello'); // returns 'Hello'
capitalize('WORLD'); // returns 'World'
capitalize('javaScript'); // returns 'Javascript'
```

It also handles empty strings and single character strings correctly.

```typescript
import { capitalize } from 'es-toolkit/string';

capitalize(''); // returns ''
capitalize('a'); // returns 'A'
capitalize('A'); // returns 'A'
```

You can use it to normalize user input or create titles.

```typescript
import { capitalize } from 'es-toolkit/string';

// Normalize user names
const userName = 'john DOE';
const formattedName = userName.split(' ').map(capitalize).join(' ');
// returns 'John Doe'

// Create titles
const title = capitalize('welcome to our website');
// returns 'Welcome to our website'
```

#### Parameters

- `str` (`string`): The string to capitalize the first character.

#### Returns

(`string`): Returns a new string with the first character capitalized and the rest in lowercase.
