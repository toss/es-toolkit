# lowerCase

Converts a string to lower case format.

```typescript
const result = lowerCase(str);
```

## Reference

### `lowerCase(str)`

Use `lowerCase` when you want to convert a string to lower case format. Lower case format is a naming convention where all words are written in lowercase and separated by spaces.

```typescript
import { lowerCase } from 'es-toolkit/string';

// Convert various string formats to lower case
lowerCase('Hello World'); // returns 'hello world'
lowerCase('camelCase'); // returns 'camel case'
lowerCase('some-kebab-case'); // returns 'some kebab case'
lowerCase('PascalCase'); // returns 'pascal case'
lowerCase('SCREAMING_SNAKE_CASE'); // returns 'screaming snake case'
```

It's useful when creating user-facing text or titles.

```typescript
import { lowerCase } from 'es-toolkit/string';

// Generate user interface text
const fieldName = 'firstName';
const label = lowerCase(fieldName); // 'first name'

// Convert API keys to user-friendly text
const apiKeys = ['userEmail', 'phoneNumber', 'birthDate'];
const labels = apiKeys.map(key => lowerCase(key));
// returns ['user email', 'phone number', 'birth date']
```

It can also be used when displaying configuration or option names.

```typescript
import { lowerCase } from 'es-toolkit/string';

// Display settings menu
const settings = {
  enableNotifications: true,
  darkModeEnabled: false,
  autoSaveInterval: 300,
};

for (const [key, value] of Object.entries(settings)) {
  const displayName = lowerCase(key);
  console.log(`${displayName}: ${value}`);
}
// Output:
// enable notifications: true
// dark mode enabled: false
// auto save interval: 300
```

It properly handles strings with special characters or spaces.

```typescript
import { lowerCase } from 'es-toolkit/string';

lowerCase('HTTPSConnection'); // returns 'https connection'
lowerCase('user_profile-settings'); // returns 'user profile settings'
lowerCase('  mixed   CASE   text  '); // returns 'mixed case text'
```

#### Parameters

- `str` (`string`): The string to convert to lower case format.

#### Returns

(`string`): Returns a new string converted to lower case format.
