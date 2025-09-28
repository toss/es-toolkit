# isElement (Lodash compatibility)

::: warning Use `instanceof HTMLElement`

This `isElement` function performs structural checks which can be inaccurate and slow.

Instead, use the more accurate and modern `instanceof HTMLElement` or `element.nodeType === 1` checks.

:::

Checks if a value is a DOM element.

```typescript
const result = isElement(value);
```

## Reference

### `isElement(value)`

Use `isElement` when you need to check if a given value is a DOM element. This function performs structural checks, so the results may not be completely accurate.

```typescript
import { isElement } from 'es-toolkit/compat';

// DOM elements
isElement(document.body); // true
isElement(document.createElement('div')); // true
isElement(document.querySelector('p')); // true (if element exists)

// Non-DOM element values
isElement('<body>'); // false
isElement({}); // false
isElement(null); // false
isElement(undefined); // false

// Text nodes or other node types
isElement(document.createTextNode('text')); // false
isElement(document.createComment('comment')); // false
```

#### Parameters

- `value` (`any`): The value to check.

#### Returns

(`boolean`): Returns `true` if the value appears to be a DOM element, otherwise `false`.