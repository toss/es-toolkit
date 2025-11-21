# noop (Lodash Compatibility)

::: warning Use `es-toolkit`'s `noop`

`es-toolkit` also has a [noop](../../function/noop.md) function that behaves the same.

:::

An empty function that does nothing.

```typescript
noop();
```

## Usage

### `noop(...args)`

Use `noop` when you need a placeholder function that does nothing. It's often used as a default value or callback function.

```typescript
import { noop } from 'es-toolkit/compat';

// Basic usage
noop(); // Does nothing
noop(1, 2, 3); // Accepts arguments but does nothing

// Use as default callback
function processData(data, callback = noop) {
  // Process data
  console.log('Processing data...', data);

  // Call callback (noop if not provided)
  callback(data);
}

processData('test'); // Works without errors even if callback not provided

// Modern alternative (recommended)
function modernProcessData(data, callback = () => {}) {
  console.log('Processing data...', data);
  callback(data);
}

// Or use optional callback
function processDataOptional(data, callback) {
  console.log('Processing data...', data);
  callback?.(data); // Only call if callback is provided
}
```

Useful in situations where a default value or placeholder is needed, but in modern JavaScript, it's more common to use optional chaining (`?.`) or default parameters.

#### Parameters

- `...args` (`any[]`): Can accept any arguments, but all are ignored.

#### Returns

(`void`): Returns nothing.
