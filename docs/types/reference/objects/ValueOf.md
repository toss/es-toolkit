# ValueOf

Creates a union of all value types in an object. Where `keyof` collects the keys, `ValueOf` collects the values.

```typescript
type Values = ValueOf<T>;
```

## Usage

### `ValueOf<T>`

Use it when you want just the value-side types of an object type as a union. It's especially handy for building a union of values from an `as const` object.

```typescript
import type { ValueOf } from 'es-toolkit/types';

const STATUS = { IDLE: 'idle', LOADING: 'loading', ERROR: 'error' } as const;

// keyof collects keys, ValueOf collects values.
type StatusKey = keyof typeof STATUS; // 'IDLE' | 'LOADING' | 'ERROR'
type Status = ValueOf<typeof STATUS>; // 'idle' | 'loading' | 'error'

// It also works on plain object types.
type Values = ValueOf<{ id: number; name: string }>; // number | string

// A Record narrows to its value type.
type Numbers = ValueOf<Record<string, number>>; // number
```

#### Type Parameters

- `T`: The object type to read values from.
