# upperCase

Converts a string to a format where all letters are uppercase and words are separated by spaces.

```typescript
const result = upperCase(str);
```

## Usage

### `upperCase(str)`

Use `upperCase` when you want to convert a string to uppercase notation. It converts each word to uppercase and connects words with spaces. It can handle strings in various notations like camelCase, kebab-case, snake_case, etc.

```typescript
import { upperCase } from 'es-toolkit/string';

// Convert camelCase to uppercase notation
upperCase('camelCase');
// Returns: 'CAMEL CASE'

// Convert strings that already have spaces
upperCase('some whitespace');
// Returns: 'SOME WHITESPACE'

// Convert kebab-case to uppercase notation
upperCase('hyphen-text');
// Returns: 'HYPHEN TEXT'

// Handle strings with consecutive uppercase letters
upperCase('HTTPSRequest');
// Returns: 'HTTPS REQUEST'
```

Useful when converting various naming conventions to a unified uppercase format:

```typescript
// Unify various key names from API responses
const apiKeys = ['user_name', 'firstName', 'email-address', 'phoneNumber'];
const upperCaseKeys = apiKeys.map(key => upperCase(key));
console.log(upperCaseKeys);
// ['USER NAME', 'FIRST NAME', 'EMAIL ADDRESS', 'PHONE NUMBER']

// Use when displaying file names
const fileName = 'profile_image_thumbnail.jpg';
const displayName = upperCase(fileName.replace('.jpg', ''));
console.log(displayName); // 'PROFILE IMAGE THUMBNAIL'
```

#### Parameters

- `str` (`string`): The string to convert to uppercase notation.

#### Returns

(`string`): Returns a string with each word converted to uppercase and separated by spaces.
