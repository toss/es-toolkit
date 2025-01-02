# asyncNoop

An asynchronous no-operation function that does nothing. This can be used as a placeholder or default function.

## Signature

```typescript
function asyncNoop(): Promise<void>;
```

### Returns

(`Promise<void>`): A Promise that resolves to undefined.

## Examples

```typescript
import { asyncNoop } from 'es-toolkit/function';

interface Props {
  fetchData?: () => Promise<void>;
}

function MyComponent({ fetchData = asyncNoop }: Props) {
  const handleFetchData = async () => {
    // Here fetchData is guaranteed to be a function, so it's safe to call.
    await fetchData();
  };

  handleFetchData();
}
```
