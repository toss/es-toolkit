# lowerFirst

Converts the first character of a string to lowercase.

```typescript
const result = lowerFirst(str);
```

## Usage

### `lowerFirst(str)`

Use `lowerFirst` when you want to make only the first letter of a string lowercase. The remaining characters are kept as-is. It's useful for creating camelCase variable names or property names.

```typescript
import { lowerFirst } from 'es-toolkit/string';

// Basic usage
lowerFirst('Hello'); // returns 'hello'
lowerFirst('WORLD'); // returns 'wORLD'
lowerFirst('JavaScript'); // returns 'javaScript'
```

It correctly handles empty strings and single-character strings.

```typescript
import { lowerFirst } from 'es-toolkit/string';

lowerFirst(''); // returns ''
lowerFirst('A'); // returns 'a'
lowerFirst('a'); // returns 'a'
```

You can use it for camelCase conversion.

```typescript
import { lowerFirst } from 'es-toolkit/string';

// Convert class name to instance variable name
const className = 'UserService';
const instanceName = lowerFirst(className); // 'userService'

// Convert constant name to camelCase
const constantName = 'API_BASE_URL';
const camelCase = lowerFirst(constantName.toLowerCase().replace(/_(.)/g, (_, letter) => letter.toUpperCase()));
// results in 'apiBaseUrl'
```

It can also be used for API responses or data transformation.

```typescript
import { lowerFirst } from 'es-toolkit/string';

// Convert database column names to JavaScript property names
const dbColumns = ['UserId', 'FirstName', 'LastName', 'EmailAddress'];
const jsProperties = dbColumns.map(column => lowerFirst(column));
// returns ['userId', 'firstName', 'lastName', 'emailAddress']

// Generate function names
function createGetter(propertyName: string): string {
  return `get${propertyName}`;
}

function createSetter(propertyName: string): string {
  return `set${propertyName}`;
}

const property = lowerFirst('UserName'); // 'userName'
const getter = createGetter(property.charAt(0).toUpperCase() + property.slice(1)); // 'getUserName'
const setter = createSetter(property.charAt(0).toUpperCase() + property.slice(1)); // 'setUserName'
```

#### Parameters

- `str` (`string`): The string to convert the first character to lowercase.

#### Returns

(`string`): Returns a new string with the first character converted to lowercase.
