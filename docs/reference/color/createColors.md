# createColors

A factory function that lets you directly control whether colors are enabled.

```typescript
import { createColors } from 'es-toolkit/color';

const c = createColors(true); // Always enable colors
const noColor = createColors(false); // Always disable colors
```

## Usage

### `createColors(enabled?)`

When called without arguments, it auto-detects the environment. Passing `true` or `false` forces colors to be enabled or disabled.

```typescript
import { createColors } from 'es-toolkit/color';

// Force disable colors in a test environment
const c = createColors(false);
c.red('hello'); // 'hello' (returned without ANSI codes)

// Force enable colors in a logging library
const log = createColors(true);
log.green('success'); // '\x1b[32msuccess\x1b[39m'
```

### When to Use

- **Testing**: When you want to disable colors and compare plain strings without ANSI codes.
- **Library development**: When you want to let users control the color option.
- **Conditional coloring**: When you want to apply colors only under certain conditions.

```typescript
import { createColors } from 'es-toolkit/color';

function createLogger(useColor: boolean) {
  const c = createColors(useColor);

  return {
    info: (msg: string) => console.log(c.blue(msg)),
    error: (msg: string) => console.error(c.red(msg)),
  };
}
```

#### Parameters

- `enabled` (`boolean`, optional): Whether to enable colors. If omitted, the environment is auto-detected.

#### Returns

(`Colors`): An object containing all color, style, and extended color functions.
