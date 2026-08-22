# ObjectKeys

Creates a union of the keys of an object as they are returned by `Object.keys`. Unlike `keyof`, numeric keys are converted to strings and symbol keys are excluded, matching the runtime behavior of JavaScript, where object keys are always strings.

```typescript
type Keys = ObjectKeys<T>;
```

## Usage

### `ObjectKeys<T>`

Use it when you want key types that match what `Object.keys`, `Object.entries`, or a `for...in` loop actually produce at runtime. It's especially handy for typing the result of `Object.keys`, which TypeScript widens to `string[]` by default.

```typescript
import type { ObjectKeys } from 'es-toolkit/types';

// keyof keeps numeric keys as numbers, ObjectKeys converts them to strings.
type Keys = ObjectKeys<{ a: number; 1: string }>; // 'a' | '1'
type KeyofKeys = keyof { a: number; 1: string }; // 'a' | 1

// Type the result of Object.keys.
const obj = { a: 1, b: 2 };
const keys = Object.keys(obj) as Array<ObjectKeys<typeof obj>>; // Array<'a' | 'b'>

// Index signatures resolve to their string forms.
type StringKeys = ObjectKeys<Record<string, number>>; // string
type NumberKeys = ObjectKeys<Record<number, string>>; // `${number}`

// Symbol keys are excluded, like Object.keys does at runtime.
declare const sym: unique symbol;
type NoSymbols = ObjectKeys<{ a: number; [sym]: string }>; // 'a'
```

#### Type Parameters

- `T`: The object type to read keys from.
