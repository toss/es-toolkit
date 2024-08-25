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
const say = spread(function (who, what) {
  return who + ' says ' + what;
});

say(['fred', 'hello']);
// => 'fred says hello'
```
