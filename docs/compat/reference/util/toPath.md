# toPath (Lodash Compatibility)

Converts a deep key string to a path array.

```typescript
const path = toPath(deepKey);
```

## Usage

### `toPath(deepKey)`

Converts a deep key string to a path array. Supports both dot notation and bracket notation.

```typescript
import { toPath } from 'es-toolkit/compat';

// Dot notation
toPath('a.b.c');
// Returns: ['a', 'b', 'c']

// Bracket notation
toPath('a[b][c]');
// Returns: ['a', 'b', 'c']

// Mixed notation
toPath('a.b[c].d');
// Returns: ['a', 'b', 'c', 'd']

// Quoted keys
toPath('a["b.c"].d');
// Returns: ['a', 'b.c', 'd']
```

It also handles leading dots and empty keys.

```typescript
import { toPath } from 'es-toolkit/compat';

// Leading dot
toPath('.a.b.c');
// Returns: ['', 'a', 'b', 'c']

// Empty string
toPath('');
// Returns: []

// Complex path
toPath('.a[b].c.d[e]["f.g"].h');
// Returns: ['', 'a', 'b', 'c', 'd', 'e', 'f.g', 'h']
```

#### Parameters

- `deepKey` (`any`): The deep key string to convert to a path array.

#### Returns

(`string[]`): Returns an array of strings representing each part of the path.
