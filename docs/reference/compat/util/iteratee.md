# iteratee

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that returns a value from an element in a collection.

You can call `iteratee` with the following types of arguments:

- **Function**: Returns the function as-is, which will be called with the element from the collection.
- **Property name**: Returns the value of the specified property from the element.
- **Property-value pair**: Returns a boolean indicating whether the element's property matches the given value.
- **Partial object**: Returns a boolean indicating whether the element matches the properties of the partial object.

If you don't provide any arguments or pass `null`, this function will return a function that simply returns its input unchanged.

## Signature

```typescript
function iteratee(value?: null): <T>(value: T) => T;
function iteratee<F extends (...args: any[]) => unknown>(func: F): F;
function iteratee(value: symbol | number | string | object): (...args: any[]) => any;
function iteratee(
  value?: symbol | number | string | object | null | ((...args: any[]) => unknown)
): (...args: any[]) => any;
```

### Parameters

- `value` (`symbol | number | string | object | null | ((...args: any[]) => any)`): The value to convert to an iteratee.

### Returns

(`(...args: any[]) => unknown`): Returns the new iteratee function.

## Examples

```typescript
const func = iteratee();

[{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [{ a: 1 }, { a: 2 }, { a: 3 }]

const func = iteratee((object) => object.a);

[{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [1, 2, 3]

const func = iteratee('a');

[{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [1, 2, 3]
```
