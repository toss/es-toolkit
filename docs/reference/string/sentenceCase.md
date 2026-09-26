# sentenceCase

Converts a string to sentence case.

```typescript
const result = sentenceCase(str);
```

## Usage

### `sentenceCase(str)`

Use `sentenceCase` when you want to convert a string to sentence case. Sentence case is a naming convention where the first letter of the first word is capitalized, all other letters are lowercase, and words are separated by spaces.

```typescript
import { sentenceCase } from 'es-toolkit/string';

// Convert various string formats to sentence case
sentenceCase('hello world'); // returns 'Hello world'
sentenceCase('some-hyphen-text'); // returns 'Some hyphen text'
sentenceCase('CONSTANT_CASE'); // returns 'Constant case'
sentenceCase('PascalCase'); // returns 'Pascal case'
sentenceCase('mixed   SpAcE'); // returns 'Mixed sp ac e'
```

It converts identifiers such as property names, enum values, or config keys into a format suitable for human-readable labels and messages.

```typescript
import { sentenceCase } from 'es-toolkit/string';

// Convert property names to form labels
const fieldName = 'user_first_name';
const label = sentenceCase(fieldName); // 'User first name'

// Convert constant names to display text
const errorCode = 'MAX_RETRY_COUNT';
const message = sentenceCase(errorCode); // 'Max retry count'
```

It also preserves Unicode characters.

```typescript
import { sentenceCase } from 'es-toolkit/string';

sentenceCase('keep unicode 😅'); // returns 'Keep unicode 😅'
sentenceCase('한글-테스트'); // returns '한글 테스트'
```

#### Parameters

- `str` (`string`): The string to convert to sentence case.

#### Returns

(`string`): Returns a new string converted to sentence case.
