# stubObject (Lodash Compatibility)

::: warning Use `{}` directly instead

This `stubObject` function is a simple wrapper that returns an empty object and represents unnecessary abstraction.

Use the faster and more direct `{}` instead.

:::

Always returns a new empty object.

```typescript
const emptyObject = stubObject();
```

## Usage

### `stubObject()`

A function that always returns a new empty object. Use this when you need an empty object as a default value or when you need consistent return values in functional programming.

```typescript
import { stubObject } from 'es-toolkit/compat';

// Returns an empty object
const emptyObject = stubObject();
console.log(emptyObject); // => {}

// Use as default value
function processData(data = stubObject()) {
  return { ...data, processed: true };
}

console.log(processData()); // => { processed: true }
console.log(processData({ name: 'John' })); // => { name: 'John', processed: true }

// Use in functional programming
const createEmpty = () => stubObject();
const obj = createEmpty();
obj.newProperty = 'value'; // Safe because it's a new object
```

Returns a new object instance each time.

```typescript
import { stubObject } from 'es-toolkit/compat';

const obj1 = stubObject();
const obj2 = stubObject();

console.log(obj1 === obj2); // => false (different instances)
console.log(typeof obj1); // => 'object'
console.log(Object.keys(obj1).length); // => 0
```

#### Parameters

None.

#### Returns

(`any`): Returns a new empty object.
