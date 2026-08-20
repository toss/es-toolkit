# SetRequired

Makes the given keys of an object required, leaving the rest unchanged. Like the built-in `Required`, but scoped to specific keys.

```typescript
type Ready = SetRequired<T, K>;
```

## Usage

### `SetRequired<T, K>`

Use it once you know that some optional keys are present, for example after a check has run.

```typescript
import type { SetRequired } from 'es-toolkit/types';

interface User {
  id: number;
  name: string;
  avatar?: string;
}

// Past this point an avatar is guaranteed.
type ProfileUser = SetRequired<User, 'avatar'>;
// => { id: number; name: string; avatar: string }

declare function renderProfile(user: ProfileUser): void;

function render(user: User) {
  if (user.avatar != null) {
    renderProfile(user as ProfileUser);
  }
}
```

#### Type Parameters

- `T`: The object type to transform.
- `K`: The keys to make required. Must be keys of `T`.
- It distributes over unions, so a union stays a union and each member keeps its own shape.
