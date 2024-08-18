# curry

Translate a function that takes multiple arguments into a sequence of families of functions, each taking a single argument. Using a curried function allows for lazy execytion or increased reusability of the function.

## Interface

```typescript
function curry<F extends (...args: any) => any>(func: F): (arg: Parameters<F>[0]) => CurriedFunctionResult<F>;
```

## Parameters

- `func` (`F`): The function to be curried.

## Return Value

(`(arg: Parameters<F>[0]) => CurriedFunctionResult<F>`): A function that takes one argument at a time until all arguments of the original function are received, at which point it calls the original function.

## Examples

## Basic Usage

```typescript
function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curry(sum);

// The parameter `a` should be given the value `10`
const sum10 = curriedSum(10);

// The parameter `b` should be given the value `15`
const sum25 = sum10(15);

// The parameter `c` should be given the value `5`. The function 'sum' has received all its arguments and will now return a value
const result = sum25(5);
```