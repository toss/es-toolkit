# spread

Creates a function that invokes `func` with the `this` binding of the create function and an array of arguments much like [`Function#apply`](https://www.ecma-international.org/ecma-262/6.0/#sec-function.prototype.apply).

## Signature

```typescript
function spread<F extends (...args: any[]) => any>(func: F, startIndex: number = 0): (...args: any[]) => ReturnType<F>;
```

### Parameters

- `func` (`F`): The function to spread arguments over.
- `startIndex` (`number`, optional): The start position of the spread. Defaults to `0`.

### Returns

(`(...args: any[]) => ReturnType<F>`): A new function that invokes `func` with the spread arguments.

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

- `spread` treats `startIndex` as `0` for negative or `NaN` values.
- `spread` accepts `startIndex` with fractional values, but coerces them to integers.

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
