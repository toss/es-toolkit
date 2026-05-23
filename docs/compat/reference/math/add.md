# add (Lodash Compatibility)

::: warning Use the `+` operator

This `add` function operates slowly due to complex type conversion and string handling.

Use the faster and simpler `+` operator instead.

:::

Adds two values.

```typescript
const result = add(value, other);
```

## Usage

### `add(value, other)`

Use `add` when you want to add two values. It can handle not only numbers but also strings.

```typescript
import { add } from 'es-toolkit/compat';

// Adding numbers
add(2, 3);
// Returns: 5

add(1.5, 2.5);
// Returns: 4

// Handling NaN
add(NaN, 5);
// Returns: NaN

add(10, NaN);
// Returns: NaN
```

When strings are included, it operates as string concatenation.

```typescript
import { add } from 'es-toolkit/compat';

add('2', 3);
// Returns: '23'

add(1, '5');
// Returns: '15'

add('hello', 'world');
// Returns: 'helloworld'
```

`undefined` values are handled specially.

```typescript
import { add } from 'es-toolkit/compat';

add(undefined, undefined);
// Returns: 0

add(5, undefined);
// Returns: 5

add(undefined, 3);
// Returns: 3
```

#### Parameters

- `value` (`number`): The first value to add.
- `other` (`number`): The second value to add.

#### Returns

(`number | string`): Returns the sum of two values. Returns a string if strings are included, otherwise returns a number.
