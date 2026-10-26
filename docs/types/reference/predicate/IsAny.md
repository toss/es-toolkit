# IsAny

Resolves to `true` when a type is `any`, and `false` otherwise.

```typescript
type Result = IsAny<T>;
```

## Usage

### `IsAny<T>`

Use it when a type-level helper has to treat `any` differently from every other type. A plain conditional type cannot do this, because `any` satisfies every `extends` check in both directions.

```typescript
import type { IsAny } from 'es-toolkit/types';

type A = IsAny<any>; // true
type B = IsAny<unknown>; // false
type C = IsAny<never>; // false
type D = IsAny<string>; // false
```

#### Type Parameters

- `T`: The type to check.
