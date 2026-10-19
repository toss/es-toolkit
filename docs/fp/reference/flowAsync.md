# flowAsync (Functional Programming)

Performs left-to-right async function composition, returning a reusable async function that awaits every intermediate result.

```typescript
const fn = flowAsync(...functions);
const result = await fn(...args);
```

::: info

`flowAsync` is the promise-aware sibling of [`flow`](./flow.md). `flow` passes each raw return value straight to the next function, so a returned `Promise` arrives unresolved; `flowAsync` awaits every step, letting synchronous and asynchronous functions mix freely in one chain.

:::

## Usage

`flowAsync` takes a sequence of functions and composes them left-to-right into a single async function. The first function may take any number of arguments; every later function is unary and receives the awaited result of the previous one. The composed function always returns a `Promise`.

```typescript
import { flowAsync } from 'es-toolkit/fp';

const fetchUser = async (id: number) => ({ id, name: 'Alice' });
const getName = (user: { name: string }) => user.name;

const getUserName = flowAsync(fetchUser, getName);

await getUserName(1); // => 'Alice'
```

Synchronous and asynchronous functions can be mixed in any order; each result is awaited before it is passed on.

```typescript
import { flowAsync } from 'es-toolkit/fp';

const process = flowAsync(
  (x: number) => x + 1,
  async x => x * 3,
  x => `value: ${x}`
);

await process(1); // => 'value: 6'
```

If any function throws or returns a rejected `Promise`, the composed function rejects with that error, so a single `try`/`catch` (or `.catch`) around the call handles failures from every step.

```typescript
import { flowAsync } from 'es-toolkit/fp';

const risky = flowAsync(
  async (id: number) => {
    throw new Error(`user ${id} not found`);
  },
  (user: { name: string }) => user.name
);

await risky(1); // rejects with Error: user 1 not found
```

#### Parameters

- `functions`: The functions to compose, from left to right. The first may take any number of arguments; the rest are unary, each receiving the awaited output of the previous function.

#### Returns

A new async function that applies every function in sequence, awaiting each result. It accepts the same parameters as the first function and resolves to the awaited result of the last. The public overloads infer the precise types from the chain.
