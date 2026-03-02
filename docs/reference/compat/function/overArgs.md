# overArgs (Lodash Compatibility)

::: warning Use arrow functions and direct transformation

This `overArgs` function creates a complex wrapper that transforms each argument, resulting in slow performance. Using arrow functions to transform arguments directly results in clearer and faster code.

Instead, use the faster and more modern arrow functions and direct transformation.

:::

Creates a new function that transforms each argument of a function with the corresponding transform function and then executes it.

```typescript
const wrapped = overArgs(func, transforms);
```

## Usage

### `overArgs(func, ...transforms)`

Use `overArgs` when you want to transform each argument before calling a function. Each argument is processed by the corresponding transform function.

```typescript
import { overArgs } from 'es-toolkit/compat';

function doubled(n) {
  return n * 2;
}

function square(n) {
  return n * n;
}

// First argument is doubled, second argument is squared
const func = overArgs((x, y) => [x, y], [doubled, square]);
func(5, 3);
// Returns: [10, 9]
```

You can also extract properties using strings.

```typescript
import { overArgs } from 'es-toolkit/compat';

const user1 = { name: 'John', age: 30 };
const user2 = { name: 'Jane', age: 25 };

// Extract properties from each object
const getUserInfo = overArgs((name, age) => `${name} is ${age} years old`, ['name', 'age']);
getUserInfo(user1, user2);
// Returns: "John is 25 years old"
```

If a transform function is not provided or is `null`/`undefined`, the argument is passed as is.

```typescript
import { overArgs } from 'es-toolkit/compat';

const func = overArgs((a, b, c) => [a, b, c], [n => n * 2, null, n => n * 3]);
func(5, 10, 15);
// Returns: [10, 10, 45]
```

Arguments that exceed the number of transform functions are passed as is.

```typescript
import { overArgs } from 'es-toolkit/compat';

const func = overArgs((a, b, c) => [a, b, c], [n => n * 2]);
func(5, 10, 15);
// Returns: [10, 10, 15]
```

You can also check if arguments match objects.

```typescript
import { overArgs } from 'es-toolkit/compat';

const func = overArgs((match1, match2) => [match1, match2], [{ age: 30 }, { active: true }]);

func({ name: 'John', age: 30 }, { active: true, status: 'online' });
// Returns: [true, true]
```

#### Parameters

- `func` (`(...args: any[]) => any`): The function to wrap.
- `...transforms` (`Array<(...args: any[]) => any | string | object | array>`): The functions to transform arguments. Each transform can be one of the following:
  - A function that accepts and returns a value
  - A string to get a property value (e.g., 'name' gets the name property)
  - An object to check if the argument matches the properties
  - A [property, value] array to check property matching

#### Returns

(`(...args: any[]) => any`): Returns a new function that transforms the arguments and then calls the original function.
