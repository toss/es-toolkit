# deburr

Converts special characters and diacritics to ASCII characters.

```typescript
const result = deburr(str);
```

## Usage

### `deburr(str)`

Use `deburr` when you want to convert special characters or diacritics in a string to ASCII characters. It's useful for normalizing characters in URLs, filenames, or search functionality.

```typescript
import { deburr } from 'es-toolkit/string';

// Basic usage
deburr('café'); // returns 'cafe'
deburr('résumé'); // returns 'resume'
deburr('naïve'); // returns 'naive'
deburr('Zürich'); // returns 'Zurich'
```

It can handle special characters from various languages.

```typescript
import { deburr } from 'es-toolkit/string';

// German
deburr('München'); // returns 'Munchen'
deburr('Björk'); // returns 'Bjork'

// French
deburr('Crème brûlée'); // returns 'Creme brulee'
deburr('naïveté'); // returns 'naivete'

// Spanish
deburr('niño'); // returns 'nino'
deburr('mañana'); // returns 'manana'
```

You can use it for URL generation or filename cleaning.

```typescript
import { deburr } from 'es-toolkit/string';

// Generate URL slug
const title = 'Café의 특별한 메뉴';
const slug = deburr(title).toLowerCase().replace(/\s+/g, '-');
// returns 'cafe의-특별한-메뉴'

// Clean filename
const fileName = 'résumé-김철수.pdf';
const cleanName = deburr(fileName); // returns 'resume-김철수.pdf'
```

It makes string comparison easier in search functionality.

```typescript
import { deburr } from 'es-toolkit/string';

function searchMatch(query: string, target: string): boolean {
  const normalizedQuery = deburr(query.toLowerCase());
  const normalizedTarget = deburr(target.toLowerCase());
  return normalizedTarget.includes(normalizedQuery);
}

searchMatch('cafe', 'Café Mocha'); // returns true
searchMatch('resume', 'résumé.pdf'); // returns true
```

#### Parameters

- `str` (`string`): The string containing special characters or diacritics.

#### Returns

(`string`): Returns a new string with special characters and diacritics converted to ASCII characters.
