# uniqBy (for `Iterator`s)

Lazily yields the elements of an iterator whose mapped key has not been seen before.

```typescript
const unique = uniqBy(source, getKey);
```

## Usage

### `uniqBy(source, getKey)`

Use `uniqBy` when you want to deduplicate a stream of elements by a derived key — for example, keeping the first event per user ID. The order of first occurrence is preserved, and keys are compared with SameValueZero semantics (matching `Set`), so `NaN` keys deduplicate. Deduplication is streaming: each element is emitted as soon as it is found to be unique, so it works with infinite iterators when bounded by a short-circuiting helper.

```typescript
import { uniqBy } from 'es-toolkit/iterator';

// Keep the first element for each mapped key.
uniqBy([1.1, 1.2, 2.3, 2.4].values(), Math.floor).toArray();
// Returns: [1.1, 2.3]

// Deduplicate objects by a derived key.
const events = [
  { userId: 1, type: 'click' },
  { userId: 1, type: 'view' },
  { userId: 2, type: 'click' },
];
uniqBy(events.values(), e => e.userId).toArray();
// Returns: [{ userId: 1, type: 'click' }, { userId: 2, type: 'click' }]
```

#### Parameters

- `source` (`Iterator<T>`): The iterator to deduplicate.
- `getKey` (`(value: T) => K`): Maps an element to the key used to detect duplicates.

#### Returns

(`IteratorObject<T, undefined>`): A lazy iterator over the elements with duplicate keys removed. It carries every native iterator helper (`map`, `take`, `toArray`, ...) for further chaining.
