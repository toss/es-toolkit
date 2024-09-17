# curry

Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.

Note: Specify the arity when using default parameters, as the length property value is affected by default parameters.

## Signature

```typescript
function curry<F extends (...args: any) => any, A extends number = FullParameters<F>['length']>(
  func: F,
  arity: A = func.length
): CurryResult<F, A>;
```

### Parameters

- `func` (`F`): The function to curry.
- `arity` (`A`): The number of arguments to be received

### Returns

(`CurryResult<F, A>`): A curried function that can be called with a single argument at a time.

## Examples

```typescript
function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curry(sum);

// The parameter `a` should be given the value `10`.
const sum10 = curriedSum(10);

// The parameter `b` should be given the value `15`.
const sum25 = sum10(15);

// The parameter `c` should be given the value `5`. The function 'sum' has received all its arguments and will now return a value.
const result = sum25(5);

// Curring the function with optional parameters.
function minus(a: number, b: number, c?: number, d?: number) {
  return a - b - (c ?? 0) - (d ?? 0);
}

// The parameter `a` should be given the value `10`, and `b` should be given the value `5`.
const minusFrom5 = curry(minus)(10)(5);

// The parameter `c` should be given the default value `1`.
const minusFrom4 = minusFrom5();

// The parameter `d` should be given the value `undefined`. The function `minus` has received all its argument and will now return a value.
const result4 = minusFrom4();

// The parameter `d` should be given the value `1`. The function `minus` has received all its argument and will now return a value.
const result3 = minusFrom4(1);

// Set arity. The function `minus` will receive only 2 arguments.
const curriedMinus = curry(minus, 2);

// The parameter `a` should be given the value `10`.
const minusFrom10 = curriedMinus(10);

// The parameter `b` should be given the value `5`. The function `minus` has received the number of arguments specified by `arity`. So, it will now return a value.
const result5 = minusFrom10(5);
```
