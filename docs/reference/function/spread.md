# spread

Creates a new function that spreads elements of an array argument into individual arguments for the original function.

## Signature

```typescript
function spread<F extends (...args: any[]) => any>(func: F): (argsArr: Parameters<F>) => ReturnType<F>;
```

### Parameters

- `func` (`F`): The function to be transformed. It can be any function with any number of arguments.

### Returns

(`(args: Parameters<F>) => ReturnType<F>`): A new function that takes an array of arguments and returns the result of calling the original function with those arguments.

## Examples

```typescript
import { spread } from 'es-toolkit/function';

const say = spread(function (who, what) {
  return who + ' says ' + what;
});

say(['fred', 'hello']);
// => 'fred says hello'
```

## Lodash Compatibility

Import `spread` from `es-toolkit/compat` for full compatibility with lodash.

- `spread` accepts an additional numeric parameter, `argsIndex`, which specifies the position at which the argument array is positioned among the preceding parameters.
  - If `argsIndex` is negative or `NaN`, it defaults to `0`. If it's a fractional number, it is rounded to the nearest integer.

```typescript
import { spread } from 'es-toolkit/compat';

function fn(a: unknown, b: unknown, c: unknown) {
  return Array.from(arguments);
}

spread(fn, -1)([1, 2]); // Returns [1, 2]
spread(fn, NaN)([1, 2]); // Returns [1, 2]
spread(fn, 'a')([1, 2]); // Returns [1, 2]
spread(fn, 1.6)(1, [2, 3]); // Returns [1, 2, 3]
```
