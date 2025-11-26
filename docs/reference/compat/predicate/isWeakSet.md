# isWeakSet (Lodash Compatibility)

::: warning Use `instanceof` operator instead

This `isWeakSet` function is a Lodash compatibility function, but is a simple type check.

Use the simpler and more modern `value instanceof WeakSet` instead.

:::

Checks if a value is a WeakSet.

```typescript
const result = isWeakSet(value);
```

## Usage

### `isWeakSet(value)`

Use `isWeakSet` when you want to type-safely check if a value is a WeakSet. It also works as a type guard in TypeScript.

```typescript
import { isWeakSet } from 'es-toolkit/compat';

// WeakSet checking
const weakSet = new WeakSet();
isWeakSet(weakSet); // true

// Other types return false
isWeakSet(new Set()); // false
isWeakSet(new Map()); // false
isWeakSet(new WeakMap()); // false
isWeakSet([]); // false
isWeakSet({}); // false
isWeakSet('weakset'); // false
isWeakSet(123); // false
isWeakSet(null); // false
isWeakSet(undefined); // false
```

It also distinguishes from other similar collections.

```typescript
import { isWeakSet } from 'es-toolkit/compat';

// WeakSet vs Set
const obj = {};
const weakSet = new WeakSet([obj]);
const set = new Set([obj]);

isWeakSet(weakSet); // true
isWeakSet(set); // false

// WeakSet vs WeakMap
isWeakSet(new WeakSet()); // true
isWeakSet(new WeakMap()); // false

// WeakSet vs array
isWeakSet(new WeakSet()); // true
isWeakSet([]); // false
```

It's useful when utilizing WeakSet's special properties.

```typescript
import { isWeakSet } from 'es-toolkit/compat';

function addWeakReference(collection: unknown, item: object) {
  if (isWeakSet(collection)) {
    // WeakSet can only store objects and maintains weak references
    collection.add(item);
    console.log('Stored with weak reference in WeakSet');

    // WeakSet has no size information and cannot be iterated
    console.log('WeakSet has no size information and cannot be iterated');
  } else {
    console.log('Not a WeakSet');
  }
}

const weakSet = new WeakSet();
const regularSet = new Set();
const obj = { id: 1 };

addWeakReference(weakSet, obj); // "Stored with weak reference in WeakSet"
addWeakReference(regularSet, obj); // "Not a WeakSet"
```

It's useful for object tracking to prevent memory leaks.

```typescript
import { isWeakSet } from 'es-toolkit/compat';

// DOM element tracking example
function trackDOMElement(tracker: unknown, element: Element) {
  if (isWeakSet(tracker)) {
    // When DOM elements are removed, they're automatically removed from WeakSet
    tracker.add(element);
    console.log('Started tracking DOM element');

    // Check tracking status later
    if (tracker.has(element)) {
      console.log('This element is being tracked');
    }
  }
}
```

#### Parameters

- `value` (`unknown`): The value to check if it's a WeakSet.

#### Returns

(`boolean`): Returns `true` if the value is a WeakSet, `false` otherwise.
