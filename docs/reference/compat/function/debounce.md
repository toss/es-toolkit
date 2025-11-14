# debounce (Lodash compatibility)

::: warning Use [`debounce`](../../function/debounce.md) from `es-toolkit`

This `debounce` function has overhead due to complex `maxWait` handling and Lodash-compatible option structure.

Instead, use the faster and more modern [`debounce`](../../function/debounce.md) from `es-toolkit`.

:::

Creates a debounced function that delays invoking the provided function until after `wait` milliseconds have elapsed since the last time it was invoked.

```typescript
const debouncedFunction = debounce(func, wait, options);
```

## Usage

### `debounce(func, wait, options)`

Use `debounce` when you want to delay function invocation. It's useful for preventing excessive calls in search inputs, scroll events, button clicks, etc.

```typescript
import { debounce } from 'es-toolkit/compat';

// Basic usage
const searchFunction = debounce(query => {
  console.log('Searching:', query);
}, 300);

// Only executes if not called again within 300ms
searchFunction('React'); // Not executed
searchFunction('Vue'); // Not executed
searchFunction('Angular'); // Logs "Searching: Angular" after 300ms
```

Comparison with main library debounce:

```typescript
// compat version (Lodash compatible, additional options like maxWait)
import { debounce } from 'es-toolkit/compat';
const debouncedCompat = debounce(func, 300, {
  leading: true,
  trailing: false,
  maxWait: 1000
});

// Main library version (faster, simpler)
import { debounce } from 'es-toolkit';
const debouncedMain = debounce(func, 300, {
  edges: ['leading'] // Uses edges instead of leading/trailing
});
```

Leading and trailing options:

```typescript
import { debounce } from 'es-toolkit/compat';

const func = () => console.log('Executed');

// leading: true - Execute immediately on first call
const leadingDebounce = debounce(func, 1000, { leading: true });
leadingDebounce(); // Immediately logs "Executed"
leadingDebounce(); // Wait 1 second
// No additional execution after 1 second

// trailing: true (default) - Execute after delay following last call
const trailingDebounce = debounce(func, 1000, { trailing: true });
trailingDebounce(); // Wait 1 second
trailingDebounce(); // Wait 1 second (cancels previous timer)
// Logs "Executed" after 1 second

// Both true - Execute at start and end
const bothDebounce = debounce(func, 1000, {
  leading: true,
  trailing: true,
});
bothDebounce(); // Immediately logs "Executed"
bothDebounce(); // Wait 1 second
// Logs "Executed" after 1 second (trailing)
```

maxWait option:

```typescript
import { debounce } from 'es-toolkit/compat';

// Guarantees execution at least every 2 seconds
const debouncedWithMaxWait = debounce(() => console.log('Saved'), 500, { maxWait: 2000 });

// Even with rapid consecutive calls, executes every 2 seconds
setInterval(() => {
  debouncedWithMaxWait();
}, 100); // Calls every 100ms but logs "Saved" every 2 seconds
```

Real-world search example:

```typescript
import { debounce } from 'es-toolkit/compat';

class SearchComponent {
  constructor() {
    this.searchInput = document.getElementById('search');

    // Debounce user input by 300ms
    this.debouncedSearch = debounce(this.performSearch.bind(this), 300, {
      leading: false, // Don't search immediately on input start
      trailing: true, // Search after input stops
    });

    this.searchInput.addEventListener('input', e => {
      this.debouncedSearch(e.target.value);
    });
  }

  performSearch(query) {
    if (query.length < 2) return;

    console.log('API call:', query);
    // fetch(`/api/search?q=${query}`)...
  }
}
```

Scroll event optimization:

```typescript
import { debounce } from 'es-toolkit/compat';

// Debounce scroll events by 100ms, but execute at least every 500ms
const optimizedScrollHandler = debounce(
  () => {
    const scrollTop = window.pageYOffset;
    console.log('Scroll position:', scrollTop);

    // Header hide/show logic
    if (scrollTop > 100) {
      document.header.classList.add('hidden');
    } else {
      document.header.classList.remove('hidden');
    }
  },
  100,
  { maxWait: 500 }
);

window.addEventListener('scroll', optimizedScrollHandler);
```

API call throttling:

```typescript
import { debounce } from 'es-toolkit/compat';

class AutoSave {
  constructor() {
    // Debounce by 500ms, save at least every 5 seconds
    this.debouncedSave = debounce(this.saveToServer.bind(this), 500, { maxWait: 5000 });
  }

  onTextChange(content) {
    this.pendingContent = content;
    this.debouncedSave();
  }

  saveToServer() {
    if (!this.pendingContent) return;

    console.log('Saving to server:', this.pendingContent);
    // fetch('/api/save', { ... })

    this.pendingContent = null;
  }
}
```

cancel and flush methods:

```typescript
import { debounce } from 'es-toolkit/compat';

const debouncedFunc = debounce(() => {
  console.log('Executed');
}, 1000);

debouncedFunc(); // Waiting 1 second

// Cancel pending execution
debouncedFunc.cancel();

// Or execute immediately
debouncedFunc(); // Start waiting 1 second
debouncedFunc.flush(); // Immediately logs "Executed" and cancels timer
```

Preventing duplicate button clicks:

```typescript
import { debounce } from 'es-toolkit/compat';

const handleSubmit = debounce(
  async formData => {
    console.log('Submitting form...');
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      });
      console.log('Submission complete');
    } catch (error) {
      console.error('Submission failed:', error);
    }
  },
  1000,
  { leading: true, trailing: false } // Only handle first click
);

document.getElementById('submit-btn').addEventListener('click', e => {
  const formData = new FormData(e.target.form);
  handleSubmit(formData);
});
```

Resize event handling:

```typescript
import { debounce } from 'es-toolkit/compat';

const handleResize = debounce(
  () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log('Window resized:', { width, height });

    // Recalculate layout
    recalculateLayout();
  },
  250,
  { leading: false, trailing: true }
);

window.addEventListener('resize', handleResize);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  handleResize.cancel();
});
```

#### Parameters

- `func` (`Function`): The function to debounce.
- `wait` (`number`, optional): The number of milliseconds to delay. Defaults to `0`.
- `options` (`DebounceSettings`, optional): An options object.
  - `leading` (`boolean`): If `true`, executes the function at the start of the delay. Defaults to `false`.
  - `trailing` (`boolean`): If `true`, executes the function at the end of the delay. Defaults to `true`.
  - `maxWait` (`number`): The maximum time the function execution can be delayed. Defaults to `Infinity`.

#### Returns

(`DebouncedFunc`): Returns the debounced function. It includes `cancel()` and `flush()` methods.
