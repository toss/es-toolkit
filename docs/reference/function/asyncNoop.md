# asyncNoop

A function that asynchronously does nothing.

```typescript
const promise = asyncNoop();
```

::: info [`noop`](./noop.md) function

If you need a function that synchronously does nothing, use the `noop` function which immediately returns `void`.

:::

## Usage

### `asyncNoop()`

Use `asyncNoop` when you need to fill a placeholder or use as a default value where an asynchronous function is required. It returns a `Promise` that resolves to `undefined`.

```typescript
import { asyncNoop } from 'es-toolkit/function';

// Example using as a default value
interface Props {
  fetchData?: () => Promise<void>;
}

function MyComponent({ fetchData = asyncNoop }: Props) {
  const handleFetchData = async () => {
    // fetchData is always a function, so it's safe to call
    await fetchData();
  };

  handleFetchData();
}

// Example of direct invocation
asyncNoop();
// Returns: Promise<void>

await asyncNoop();
// Returns: undefined
```

#### Returns

(`Promise<void>`): A `Promise` that resolves to `undefined`.
