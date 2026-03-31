# allKeyed

Resolves an object of promises concurrently, returning an object with the same keys and resolved values.

```typescript
await allKeyed(tasks);
```

## Usage

### `allKeyed(tasks)`

Use `allKeyed` when you want to run multiple promises in parallel and access results by name instead of positional indices. Similar to `Promise.all`, but accepts an object of promises and preserves keys in the result.

Based on the [TC39 `Promise.allKeyed` proposal](https://github.com/tc39/proposal-await-dictionary).

```typescript
import { allKeyed } from 'es-toolkit/promise';

const { user, posts } = await allKeyed({
  user: fetchUser(),
  posts: fetchPosts(),
});
```

Plain values are also supported alongside promises.

```typescript
const result = await allKeyed({
  a: Promise.resolve(1),
  b: 2,
});
// { a: 1, b: 2 }
```

It's also useful when you want to fetch multiple resources in parallel without worrying about array ordering.

```typescript
// With Promise.all, swapping the order silently breaks destructuring:
// const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);

// With allKeyed, keys are explicit — no ordering bugs:
const { user, posts } = await allKeyed({
  user: fetchUser(),
  posts: fetchPosts(),
});
```

#### Parameters

- `tasks` (`T`): An object whose values are promises (or plain values) to resolve concurrently.

#### Returns

(`Promise<{ [K in keyof T]: Awaited<T[K]> }>`): A promise that resolves to an object with the same keys and resolved values.
