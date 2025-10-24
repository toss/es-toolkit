# constantCase

Converts a string to constant case.

```typescript
const result = constantCase(str);
```

## Reference

### `constantCase(str)`

Use `constantCase` when you want to convert a string to constant case. Constant case is a naming convention where all characters are uppercase and words are separated by underscores (`_`).

```typescript
import { constantCase } from 'es-toolkit/string';

// Convert various string formats to constant case
constantCase('hello world'); // returns 'HELLO_WORLD'
constantCase('camelCase'); // returns 'CAMEL_CASE'
constantCase('some-kebab-case'); // returns 'SOME_KEBAB_CASE'
constantCase('PascalCase'); // returns 'PASCAL_CASE'
constantCase('snake_case'); // returns 'SNAKE_CASE'
```

It's a commonly used naming convention when defining constants in JavaScript or other programming languages.

```typescript
import { constantCase } from 'es-toolkit/string';

// Generate environment variable names
const configKey = 'api base url';
const envVar = constantCase(configKey); // 'API_BASE_URL'

// Generate constant names
const settingName = 'maximum retry count';
const constantName = constantCase(settingName); // 'MAXIMUM_RETRY_COUNT'
```

It also properly handles strings with spaces or special characters.

```typescript
import { constantCase } from 'es-toolkit/string';

constantCase('HTTP Request'); // returns 'HTTP_REQUEST'
constantCase('user-agent-string'); // returns 'USER_AGENT_STRING'
constantCase('  multiple   spaces  '); // returns 'MULTIPLE_SPACES'
```

#### Parameters

- `str` (`string`): The string to convert to constant case.

#### Returns

(`string`): Returns a new string converted to constant case.
