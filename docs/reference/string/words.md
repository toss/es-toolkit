# words

Splits a string into an array of words.

```typescript
const result = words(str);
```

## Reference

### `words(str)`

Use `words` when you want to split a string into individual words. It splits words based on camelCase, kebab-case, spaces, punctuation, and correctly recognizes emojis and Unicode characters. It's useful when processing strings with various naming conventions.

```typescript
import { words } from 'es-toolkit/string';

// Split strings separated by punctuation and spaces into words
words('fred, barney, & pebbles');
// Returns: ['fred', 'barney', 'pebbles']

// Correctly split camelCase and consecutive uppercase letters
words('camelCaseHTTPRequest🚀');
// Returns: ['camel', 'Case', 'HTTP', 'Request', '🚀']

// Handle Unicode characters and numbers
words('Lunedì 18 Set');
// Returns: ['Lunedì', '18', 'Set']
```

Useful for splitting strings into words in various situations:

```typescript
// Split variable names into words to convert to different naming conventions
const variableName = 'getUserProfile';
const wordList = words(variableName);
console.log(wordList); // ['get', 'User', 'Profile']

// Split snake_case into words
const snakeCase = 'user_profile_data';
const snakeWords = words(snakeCase);
console.log(snakeWords); // ['user', 'profile', 'data']

// Split kebab-case into words
const kebabCase = 'user-profile-data';
const kebabWords = words(kebabCase);
console.log(kebabWords); // ['user', 'profile', 'data']

// Handle complex strings
const complex = 'XMLHttpRequest2.0_parser-v1.2';
const complexWords = words(complex);
console.log(complexWords); // ['XML', 'Http', 'Request', '2', '0', 'parser', 'v', '1', '2']
```

#### Parameters

- `str` (`string`): The string to split into words.

#### Returns

(`string[]`): Returns an array of words split from the string.
