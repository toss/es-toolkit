# toDefaulted (Lodash Compatibility)

::: warning Use spread operator or `Object.assign` instead

This `toDefaulted` function operates slowly due to deep cloning and complex default value handling.

Use faster and more modern spread operator (`...`) or `Object.assign()` instead.

:::

Creates a new object by applying default values to an object.

```typescript
const defaulted = toDefaulted(object, ...sources);
```

## Reference

### `toDefaulted(object, ...sources)`

Use `toDefaulted` when you want to create a new object by applying default values from one or more source objects to a target object. Default values are only set for properties that are `undefined` or come from `Object.prototype`.

```typescript
import { toDefaulted } from 'es-toolkit/compat';

// Basic default value assignment
const user = { name: 'John' };
const defaults = { name: 'Anonymous', age: 25, role: 'user' };
toDefaulted(user, defaults);
// => { name: 'John', age: 25, role: 'user' }

// Apply defaults from multiple sources
const config = { theme: 'dark' };
const defaults1 = { theme: 'light', lang: 'en' };
const defaults2 = { lang: 'ko', region: 'Asia' };
toDefaulted(config, defaults1, defaults2);
// => { theme: 'dark', lang: 'en', region: 'Asia' }
```

Only `undefined` values are replaced with defaults, while `null` values are preserved.

```typescript
import { toDefaulted } from 'es-toolkit/compat';

const data = {
  name: undefined,
  age: null,
  active: false,
};
const defaults = {
  name: 'Default',
  age: 18,
  active: true,
  role: 'user',
};

toDefaulted(data, defaults);
// => { name: 'Default', age: null, active: false, role: 'user' }
```

The original object is not modified; a new object is returned.

```typescript
import { toDefaulted } from 'es-toolkit/compat';

const original = { a: 1 };
const result = toDefaulted(original, { a: 2, b: 3 });

console.log(original); // { a: 1 } (not modified)
console.log(result); // { a: 1, b: 3 } (new object)
```

#### Parameters

- `object` (`object`): The target object that will receive default values.
- `sources` (`object[]`): The source objects that provide default values. Applied in left-to-right order.

#### Returns

(`object`): Returns a new object with the default values applied.
