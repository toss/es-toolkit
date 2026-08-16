# isBrowser

Checks if the current execution environment is a browser.

```typescript
const result = isBrowser();
```

## Usage

### `isBrowser()`

Use `isBrowser` when you have code that should only run in browser environments. It determines if the environment is a browser by checking for the existence of `window.document`. Useful in SSR (Server-Side Rendering) or Node.js environments.

```typescript
import { isBrowser } from 'es-toolkit/predicate';

// Manipulate DOM only in browser environment
if (isBrowser()) {
  document.getElementById('app').innerHTML = 'Hello World';
  console.log('Running in browser environment');
} else {
  console.log('Running in server environment');
}
```

Can be used to implement conditional logic based on the environment.

```typescript
import { isBrowser } from 'es-toolkit/predicate';

function getWindowWidth() {
  if (isBrowser()) {
    return window.innerWidth;
  }
  return 0; // Return default value on server
}

// Registering event listeners
function addWindowListener() {
  if (isBrowser()) {
    window.addEventListener('resize', () => {
      console.log('Window size changed');
    });
  }
}
```

Particularly useful in SSR frameworks like Next.js or Nuxt.js.

```typescript
import { isBrowser } from 'es-toolkit/predicate';

function initializeAnalytics() {
  if (isBrowser()) {
    // Load analytics script only in browser
    const script = document.createElement('script');
    script.src = 'https://analytics.example.com/script.js';
    document.head.appendChild(script);
  }
}

// Accessing local storage
function getStoredValue(key: string) {
  if (isBrowser()) {
    return localStorage.getItem(key);
  }
  return null;
}
```

#### Returns

(`boolean`): Returns `true` if the current environment is a browser, `false` otherwise.
