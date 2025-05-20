# overArgs

::: info
This function can only be imported from `es-toolkit/compat` for compatibility purposes. This is either because a native JavaScript API alternative exists, or it is not yet fully optimized.

When you import this function from `es-toolkit/compat`, it behaves [exactly the same as lodash](../../../compatibility.md).
:::

`overArgs` creates a new function that processes the arguments passed to the target function (`func`) according to a set of predefined transformation specifications (`transformsArgs`). These transformation specifications are applied individually to each argument before they are passed to the original `func`.

`transformsArgs` can be provided as individual arguments or as nested arrays. They are flattened within the function, and each resulting element is used as a transformation specification.

Each transformation specification (`value`) is interpreted and converted into a transformation function to be applied to the corresponding argument as follows:

- `function`: Used as a function to be applied directly to the corresponding argument.
- `null` or `undefined`: The corresponding argument is passed through unchanged (`identity`).
- An `Array` of length 2, `[path, value]`: Assumes the corresponding argument is an object and is converted into a predicate function that checks if the value obtained via `property(path)` is equal to `value` (uses `matchesProperty(path, value)`).
- `object` (excluding arrays): Assumes the corresponding argument is an object and is converted into a predicate function that checks if the object's properties match the specified object (uses `matches(object)`).
- `string`, `number`, `boolean`, `symbol`: Assumes the corresponding argument is an object and is converted into a function that accesses a value using the value as a property path/key (uses `property(path/key)`). `boolean` values are converted to the string `'true'` or `'false'` before being used.
- Any other type: The corresponding argument is passed through unchanged (`identity`).

The transformations are applied to the first `n` arguments of the new function, where `n` is the number of flattened transformation specifications. Arguments beyond the number of transformations are passed through unchanged to the original function.

## Signature

```typescript
function overArgs<TFunc extends (...args: any[]) => any>(
  func: TFunc,
  ...transformsArgs: Array<OverArgsTransformArg>
): (...args: any[]) => ReturnType<TFunc>; // The parameter type of the returned function is simplified to any[]
```

### Parameters

- func (TFunc extends (...args: any[]) => any): The target function to be invoked with the transformed arguments.
- transformsArgs (Array<OverArgsTransformArg>): The transformation specifications to be applied to the arguments. These can be provided as individual arguments or nested arrays. The type of each specification is described above.

### Returns

- (...args: any[]) => ReturnType<TFunc>: Returns a new function that applies transformations to its arguments.

## Examples

```typescript
import { overArgs } from 'es-toolkit/compat';

// Helper function that returns its arguments as an array
function fn(...args) {
  return args;
}

// 1. Example using function transform specifications
const squareAndCube = (a, b) => `Square: ${a}, Cube: ${b}`;
const processNumbers = overArgs(
  squareAndCube,
  n => n * n,
  n => n * n * n
);

console.log('Example 1 (Function transforms):');
console.log(processNumbers(2, 3));
// => Square: 4, Cube: 27 (2 is transformed to 2*2=4, 3 is transformed to 3*3*3=27 before being passed to squareAndCube)

// 2. Example using property path (string) transform specifications
const formatUserInfo = (name, age) => `Name: ${name}, Age: ${age}`;
const processUserObject = overArgs(formatUserInfo, 'name', 'age');

console.log('\nExample 2 (Property string transforms):');
console.log(processUserObject({ name: 'Alice', age: 30, city: 'Seoul' }, { name: 'Bob', age: 25, city: 'Busan' }));
// => Name: Alice, Age: 25 (Extracts 'name' from the first object and 'age' from the second object before passing to formatUserInfo)

// 3. Example using object matcher transform specifications
// (Assuming the match function works correctly)
const checkAndGet = (isMatch, value) => `Match: ${isMatch}, Value: ${value}`;
const processObjectMatch = overArgs(checkAndGet, { id: 1 }, 'name');

console.log('\nExample 3 (Object matcher + Property string):');
console.log(processObjectMatch({ id: 1, name: 'Item A' }, { id: 2, name: 'Item B' }));
// => Match: true, Value: Item B ({ id: 1, name: 'Item A' } matches { id: 1 }, so result is true; extracts 'name' from { id: 2, name: 'Item B' })

// 4. Example using [path, value] array matcher transform specifications
const checkPropertyValue = isMatch => `Property matches: ${isMatch}`;
const processArrayMatch = overArgs(checkPropertyValue, ['status', 'active']);

console.log('\nExample 4 ([path, value] matcher):');
console.log(processArrayMatch({ status: 'active', type: 'user' }));
// => Property matches: true (The 'status' property of { status: 'active', type: 'user' } is equal to 'active', so result is true)
console.log(processArrayMatch({ status: 'inactive', type: 'admin' }));
// => Property matches: false (The 'status' property of { status: 'inactive', type: 'admin' } is not equal to 'active', so result is false)

// 5. Example using boolean transform specifications
const processBooleanKeys = overArgs(fn, true, false);
const objWithBooleanKeys = { true: 'Enabled', false: 'Disabled' };

console.log('\nExample 5 (Boolean transforms):');
console.log(processBooleanKeys(objWithBooleanKeys, objWithBooleanKeys));
// => [Enabled, Disabled] (Extracts the 'true' and 'false' property values from each argument)

// 6. Example using nested array forms of transformsArgs (demonstrating flatten effect)
const processNested = overArgs(fn, [s => s.toUpperCase()], ['length', o => o.value]);

console.log('\nExample 6 (Nested transformsArgs):');
console.log(processNested('hello', 'world', { value: 123 }));
// overArgs flattens transformsArgs: [s=>s.toUpperCase(), 'length', o => o.value]
// Applies s=>s.toUpperCase() to the first arg 'hello' -> 'HELLO'
// Applies 'length' (property('length')) to the second arg 'world' -> 5
// Applies o=>o.value to the third arg { value: 123 } -> 123
// Calls fn('HELLO', 5, 123)
// => [HELLO, 5, 123]
```
