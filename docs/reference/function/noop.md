# noop

A no-operation function that does nothing. This can be used as a placeholder or default function.

## Signature

```typescript
function noop(): void;
```

### Returns

(`void`): This function does not return anything.

## Examples

```typescript
import { noop } from 'es-toolkit/function';

interface Props {
  onChange?: () => void;
}

function MyComponent({ onChange = noop }: Props) {
  // Here onChange is guaranteed to be a function, so it's safe to call.
  onChange();
}
```
