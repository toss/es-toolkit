# after (Lodash Compatibility)

::: warning Use [`after`](../../function/after.md) from `es-toolkit`

This `after` function operates slowly due to complex type validation and integer conversion handling.

Instead, use the faster and more modern [after](../../function/after.md) from `es-toolkit`.

:::

Creates a function that only executes after being called a specified number of times.

```typescript
const restrictedFunction = after(n, func);
```

## Usage

### `after(n, func)`

Use `after` when you want to restrict a function to execute only after it has been called a certain number of times. It's useful for executing callbacks after multiple asynchronous operations are complete or activating a function after an initialization phase.

```typescript
import { after } from 'es-toolkit/compat';

// Basic usage
const logAfterThree = after(3, () => {
  console.log('Executed from the 3rd call!');
});

logAfterThree(); // Not executed
logAfterThree(); // Not executed
logAfterThree(); // Logs "Executed from the 3rd call!"
logAfterThree(); // Logs "Executed from the 3rd call!" (continues to execute)
```

You can also use it to execute a specific callback after all asynchronous operations are complete.

```typescript
import { after } from 'es-toolkit/compat';

const tasks = ['task1', 'task2', 'task3'];
const allTasksComplete = after(tasks.length, () => {
  console.log('All tasks completed!');
});

// Called when each task completes
tasks.forEach(task => {
  performAsyncTask(task, () => {
    console.log(`${task} complete`);
    allTasksComplete(); // Logs "All tasks completed!" on the 3rd call
  });
});
```

When you pass 0 or a negative number, it executes immediately from the first call.

```typescript
import { after } from 'es-toolkit/compat';

const immediate = after(0, () => console.log('Executed immediately'));
immediate(); // "Executed immediately"

const negative = after(-1, () => console.log('Executed immediately'));
negative(); // "Executed immediately"
```

#### Parameters

- `n` (`number`): The number of calls required before the function executes.
- `func` (`TFunc`): The function to restrict.

#### Returns

(`TFunc`): Returns a new restricted function that executes the original function from the nth call onwards.
