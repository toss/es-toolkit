# isUndefined (Lodash Compatibility)

::: warning Use `es-toolkit`'s [isUndefined](../../predicate/isUndefined.md) instead

This `isUndefined` function operates slowly due to complex handling for Lodash compatibility.

Use the faster and more modern `es-toolkit`'s [isUndefined](../../predicate/isUndefined.md) instead.

:::

Checks if a value is `undefined`.

```typescript
const result = isUndefined(value);
```

## Reference

### `isUndefined(x)`

Use `isUndefined` when you want to type-safely check if a value is exactly `undefined`. It also works as a type guard in TypeScript.

```typescript
import { isUndefined } from 'es-toolkit/compat';

// Only undefined returns true
isUndefined(undefined); // true

// null also returns false
isUndefined(null); // false

// All other values also return false
isUndefined(0); // false
isUndefined(''); // false
isUndefined(false); // false
isUndefined([]); // false
isUndefined({}); // false
isUndefined('undefined'); // false
isUndefined(NaN); // false
```

You can distinguish between `undefined` and `null`.

```typescript
import { isUndefined } from 'es-toolkit/compat';

function handleValue(value: string | null | undefined) {
  if (isUndefined(value)) {
    console.log('Value is undefined');
  } else if (value === null) {
    console.log('Value is explicitly null');
  } else {
    console.log(`Value exists: ${value}`);
  }
}

handleValue(undefined); // "Value is undefined"
handleValue(null); // "Value is explicitly null"
handleValue('hello'); // "Value exists: hello"
```

It's useful for checking undeclared variables or uninitialized properties.

```typescript
import { isUndefined } from 'es-toolkit/compat';

const obj: { name?: string; age?: number } = { name: 'John' };

if (isUndefined(obj.age)) {
  console.log('Age is not set');
  obj.age = 25; // Set default value
}

// Default value handling for function parameters
function greet(name: string, title?: string) {
  if (isUndefined(title)) {
    title = 'Mr./Ms.';
  }
  console.log(`Hello, ${title} ${name}!`);
}

greet('Kim'); // "Hello, Mr./Ms. Kim!"
greet('Kim', 'Dr.'); // "Hello, Dr. Kim!"
```

#### Parameters

- `x` (`any`): The value to check if it's `undefined`.

#### Returns

(`x is undefined`): Returns `true` if the value is `undefined`, `false` otherwise.
