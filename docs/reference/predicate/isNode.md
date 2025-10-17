# isNode

Checks if the current runtime environment is Node.js.

```typescript
const result = isNode();
```

## Reference

### `isNode()`

Use `isNode` when you want to check if the current code is running in a Node.js environment. It's useful for verifying the environment before using Node.js-specific APIs.

```typescript
import { isNode } from 'es-toolkit/predicate';

if (isNode()) {
  // Node.js-specific code
  console.log('This code is running in Node.js');
  const fs = await import('node:fs');
  const path = await import('node:path');
} else {
  // Browser-only code
  console.log('This code is running in a browser');
  const response = await fetch('/api/data');
}
```

It's also useful when conditionally using Node.js modules:

```typescript
function getEnvironmentInfo() {
  if (isNode()) {
    return {
      platform: process.platform,
      nodeVersion: process.version,
      environment: 'Node.js',
    };
  } else {
    return {
      userAgent: navigator.userAgent,
      environment: 'Browser',
    };
  }
}
```

#### Returns

(`boolean`): Returns `true` if the current environment is Node.js, `false` otherwise.
