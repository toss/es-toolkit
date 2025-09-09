# negate

Creates a function that negates the result of the predicate function.

## Signature

```typescript
function negate<F extends (...args: any[]) => boolean>(func: F): F;
```

### Parameters

- `func` (`F extends (...args: any[]) => boolean`): The function to negate.

### Returns

- (`F`): Returns the new negated function.

## Examples

```typescript
import { negate } from 'es-toolkit/function';

negate(() => true)(); // returns 'false'
negate(() => false)(); // returns 'true'
```
