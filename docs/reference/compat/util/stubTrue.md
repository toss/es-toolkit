# stubTrue (Lodash Compatibility)

::: warning Use `true` literal instead

This `stubTrue` function performs slowly due to unnecessary function calls.

Use the faster and more modern `true` literal instead.

:::

Always returns the `true` value.

```typescript
const result = stubTrue();
```

## Reference

### `stubTrue()`

Use `stubTrue` when you need a callback function or default value that always returns `true`. This is useful for providing a consistent `true` value in array method filtering or conditional logic.

```typescript
import { stubTrue } from 'es-toolkit/compat';

// Filter that keeps all elements in an array
const items = [1, 2, 3, 4, 5];
const allItems = items.filter(stubTrue);
console.log(allItems); // [1, 2, 3, 4, 5]
```

It can also be used as a default value in conditional settings.

```typescript
import { stubTrue } from 'es-toolkit/compat';

// Options that are enabled by default
const defaultOptions = {
  enableFeatureA: stubTrue(),
  enableFeatureB: stubTrue(),
  enableFeatureC: stubTrue(),
};

console.log(defaultOptions); // { enableFeatureA: true, enableFeatureB: true, enableFeatureC: true }
```

#### Parameters

None.

#### Returns

(`boolean`): Always returns `true`.
