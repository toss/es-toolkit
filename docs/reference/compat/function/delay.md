# delay (Lodash Compatibility)

::: warning Use `setTimeout`

This `delay` function is a simple wrapper around `setTimeout`, but has slight overhead due to additional type validation and number conversion.

Use the faster and standard `setTimeout` directly instead.

:::

Sets a timer to execute a function after a specified amount of time.

```typescript
const timerId = delay(func, wait, ...args);
```

## Usage

### `delay(func, wait, ...args)`

Use `delay` when you want to defer function execution by a specific amount of time. It's useful for animation timing, delaying user feedback, or scheduling asynchronous operations.

```typescript
import { delay } from 'es-toolkit/compat';

// Basic usage
const timerId = delay(() => {
  console.log('Executed after 1 second');
}, 1000);

// Using with arguments
delay(
  (name, age) => {
    console.log(`Hello, ${name}, age ${age}!`);
  },
  2000,
  'John Doe',
  30
);
// After 2 seconds: Prints "Hello, John Doe, age 30!"
```

Comparison with `setTimeout`:

```typescript
// Using delay
import { delay } from 'es-toolkit/compat';

const timerId1 = delay(myFunction, 1000, 'arg1', 'arg2');

// Using setTimeout (faster, standard)
const timerId2 = setTimeout(myFunction, 1000, 'arg1', 'arg2');

// Or with arrow function
const timerId3 = setTimeout(() => myFunction('arg1', 'arg2'), 1000);
```

Animation sequence:

```typescript
import { delay } from 'es-toolkit/compat';

class AnimationSequence {
  constructor(element) {
    this.element = element;
  }

  fadeInSequence() {
    // Start immediately
    this.element.style.opacity = '0';
    this.element.style.display = 'block';

    // Start fade-in after 100ms
    delay(() => {
      this.element.style.transition = 'opacity 500ms ease-in';
      this.element.style.opacity = '1';
    }, 100);

    // Scale animation after 1 second
    delay(() => {
      this.element.style.transform = 'scale(1.1)';
    }, 1000);

    // Back to original size after 1.5 seconds
    delay(() => {
      this.element.style.transform = 'scale(1)';
    }, 1500);
  }
}
```

Canceling timers:

```typescript
import { delay } from 'es-toolkit/compat';

class TimerManager {
  constructor() {
    this.timers = new Map();
  }

  setDelayedTask(id, task, delayMs) {
    // Cancel existing timer if it exists
    this.cancelTask(id);

    const timerId = delay(task, delayMs);
    this.timers.set(id, timerId);

    return timerId;
  }

  cancelTask(id) {
    const timerId = this.timers.get(id);
    if (timerId) {
      clearTimeout(timerId);
      this.timers.delete(id);
      return true;
    }
    return false;
  }

  cancelAllTasks() {
    this.timers.forEach(timerId => clearTimeout(timerId));
    this.timers.clear();
  }
}

const timerManager = new TimerManager();

// Schedule tasks
timerManager.setDelayedTask(
  'save',
  () => {
    console.log('Auto-saved');
  },
  5000
);

timerManager.setDelayedTask(
  'cleanup',
  () => {
    console.log('Cleanup completed');
  },
  10000
);

// Cancel a specific task if needed
// timerManager.cancelTask('save');

// Clean up all timers when page unloads
window.addEventListener('beforeunload', () => {
  timerManager.cancelAllTasks();
});
```

#### Parameters

- `func` (`Function`): The function to execute after the delay.
- `wait` (`number`): The number of milliseconds to delay.
- `args` (`...any[]`): The arguments to pass to the function when it executes.

#### Returns

(`number`): Returns the timer ID. Can be canceled with `clearTimeout()`.
