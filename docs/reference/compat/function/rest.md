# rest (Lodash Compatibility)

::: warning Use `rest` from `es-toolkit` instead

This `rest` function may have reduced performance due to additional logic such as default value handling and index validation.

Use faster, more modern [rest](../../function/rest.md) from `es-toolkit` instead.

:::

Creates a function that groups the remaining arguments from a specified index into an array.

```typescript
const restFunc = rest(func, start);
```

## Reference

### `rest(func, start)`

Use `rest` when you want to transform function arguments by grouping the remaining arguments from a specified index into an array. It's useful for creating variadic functions.

```typescript
import { rest } from 'es-toolkit/compat';

// Basic usage - group the last arguments into an array
function logMessage(level, message, ...details) {
  console.log(`[${level}] ${message}`, details);
}

const restLogger = rest(logMessage, 2);
restLogger('ERROR', 'Error occurred', 'Detail 1', 'Detail 2');
// Internally calls logMessage('ERROR', 'Error occurred', [['Detail 1', 'Detail 2']])

// Different index example
function process(action, target, ...args) {
  return { action, target, args };
}

const restProcess = rest(process, 1);
restProcess('update', 'user', 'name', 'John', 'age', 25);
// { action: 'update', target: ['user', 'name', 'John', 'age', 25], args: [] }
```

Use this when you want the last arguments of a function to be received as an array. In modern JavaScript, it's more common to use rest parameter syntax (`...args`).

#### Parameters

- `func` (`Function`): The function to transform.
- `start` (`number`, optional): The index from which to start grouping arguments into an array. Default is `func.length - 1`.

#### Returns

(`Function`): Returns a new function that groups the remaining arguments from the specified index into an array.
