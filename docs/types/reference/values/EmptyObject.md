# EmptyObject

An object with no properties.

```typescript
const empty: EmptyObject = {};
```

## Usage

### `EmptyObject`

Use it when a value must be an object that carries no data. It pairs with the `isEmptyObject` guard.

```typescript
import type { EmptyObject } from 'es-toolkit/types';

const empty: EmptyObject = {}; // ok

// const filled: EmptyObject = { a: 1 }; // error, every value would have to be never

// Useful when some steps of a flow carry no data.
interface StepContext {
  intro: EmptyObject;
  form: { amount: number };
  done: EmptyObject;
}
```
