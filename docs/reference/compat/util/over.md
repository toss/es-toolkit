# over

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that invokes the provided iteratees with the arguments it receives and returns an array of the results.

You can use several types of iteratees:

- **Functions**: Each function is called with the same arguments and the results are collected.
- **Property names**: Each property name is used to extract values from the provided object.
- **Objects**: Each object is used to check if the provided object matches its properties.
- **Property-value pairs**: Each pair checks if the specified property of the provided object matches the value.

## Signature

```typescript
// Using function iteratees
function over<T extends unknown[], R>(iteratees: Array<(...args: T) => R>): (...args: T) => R[];

// Using property-value pairs
function over<T extends [object]>(iteratees: Array<[PropertyKey, unknown]>): (...args: T) => boolean[];

// Using object matchers
function over<T extends [object]>(iteratees: object[]): (...args: T) => boolean[];

// Using property accessors
function over<T extends [object]>(iteratees: PropertyKey[]): (...args: T) => unknown[];
```

### Parameters

- `iteratees`: The iteratees to invoke. It can be:
  - **Array of functions**: Each function will be called with the same arguments.
  - **Array of property-value pairs**: Each pair will check if the specified property matches the given value.
  - **Array of objects**: Each object will be used to check if the provided object matches.
  - **Array of property keys**: Each property key will be used to access values from the provided object.

::: info Handling nullish values
If the iteratees array contains `null` or `undefined` values, they are treated as the identity function at runtime. However, this will cause TypeScript type errors without proper type definitions. This behavior is deliberately implemented to match lodash's functionality exactly.
:::

### Returns

A function that, when called with arguments, invokes all the iteratees with those arguments and returns an array of the results.

## Examples

### Using function iteratees

```typescript
import { over } from 'es-toolkit/compat';

// With standard functions
const func = over([Math.max, Math.min]);
console.log(func(1, 2, 3, 4)); // => [4, 1]

// With custom functions
const greet = name => `Hello, ${name}!`;
const shout = name => `HEY, ${name.toUpperCase()}!!!`;
const greeter = over([greet, shout]);
console.log(greeter('world')); // => ['Hello, world!', 'HEY, WORLD!!!']

// With this binding
const obj = {
  a: 1,
  b: 2,
  func: over([
    function () {
      return this.a;
    },
    function () {
      return this.b;
    },
  ]),
};
console.log(obj.func()); // => [1, 2]
```

### Using property accessors

```typescript
import { over } from 'es-toolkit/compat';

// Access properties from an object
const prop = over(['a', 'b']);
console.log(prop({ a: 1, b: 2 })); // => [1, 2]

// Works with numeric properties too
const items = ['apple', 'banana', 'cherry'];
const getItems = over([0, 2]);
console.log(getItems(items)); // => ['apple', 'cherry']
```

### Using object matchers

```typescript
import { over } from 'es-toolkit/compat';

// Check if an object matches patterns
const matcher = over([{ a: 1 }, { b: 2 }]);
console.log(matcher({ a: 1, b: 2 })); // => [true, false]
console.log(matcher({ a: 1, b: 1 })); // => [true, false]

// Empty object matches everything
const alwaysTrue = over([{}]);
console.log(alwaysTrue({ a: 1 })); // => [true]
```

### Using property-value pairs

```typescript
import { over } from 'es-toolkit/compat';

// Check if properties match values
const matchProp = over([
  ['a', 1],
  ['b', 2],
]);
console.log(matchProp({ a: 1, b: 2 })); // => [true, true]
console.log(matchProp({ a: 2, b: 1 })); // => [false, false]
```

### Edge cases

```typescript
import { over } from 'es-toolkit/compat';

// Empty array of iteratees
const emptyFunc = over([]);
console.log(emptyFunc(1, 2, 3)); // => []

// Null or undefined values (handled as identity function)
// Note: This cause TypeScript errors without type assertions
const nullFunc = over([null, undefined]);
console.log(nullFunc('a', 'b', 'c')); // => ['a', 'a']
```
