# upperFirst

Converts the first character of a string to uppercase.

```typescript
const result = upperFirst(str);
```

## Reference

### `upperFirst(str)`

Use `upperFirst` when you want to capitalize only the first letter of a string while keeping the rest of the letters unchanged. It's useful for capitalizing the beginning of sentences or formatting names.

```typescript
import { upperFirst } from 'es-toolkit/string';

// Capitalize the first letter of a lowercase string
upperFirst('fred');
// Returns: 'Fred'

// Keep the string as is if first letter is already uppercase
upperFirst('Fred');
// Returns: 'Fred'

// Keep the string as is even if all letters are uppercase
upperFirst('FRED');
// Returns: 'FRED'
```

Useful in various situations:

```typescript
// Format user names
const userName = 'john';
const displayName = upperFirst(userName);
console.log(displayName); // 'John'

// Capitalize the first letter of a sentence
const sentence = 'hello world';
const capitalizedSentence = upperFirst(sentence);
console.log(capitalizedSentence); // 'Hello world'

// Process multiple names
const names = ['alice', 'bob', 'charlie'];
const capitalizedNames = names.map(name => upperFirst(name));
console.log(capitalizedNames); // ['Alice', 'Bob', 'Charlie']

// Convert camelCase to PascalCase
const camelCase = 'firstName';
const pascalCase = upperFirst(camelCase);
console.log(pascalCase); // 'FirstName'
```

#### Parameters

- `str` (`string`): The string to capitalize the first letter of.

#### Returns

(`string`): Returns a string with the first letter converted to uppercase.
