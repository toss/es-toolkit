# reduceRight

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Reduces an array or object to a single value using an iteratee function, starting from the right.

The `reduceRight()` function goes through each element in an array or values of an object from right to left and applies a special function (called a "reducer") to them, one by one.
This function takes the result of the previous step and the current element to perform a calculation.
After going through all the elements, the function gives you one final result.

When the `reduceRight()` function starts, there's no previous result to use.
If you provide an initial value, it starts with that.
If not, it uses the last element of the array or the last value of the object and begins with the second to last element or value for the calculation.

## Signature

```typescript
function reduceRight<T, U>(
  collection: T[],
  iteratee: (accumulator: U, value: T, index: number, collection: T[]) => U,
  initialValue: U
): U;
function reduceRight<T>(collection: T[], iteratee: (accumulator: T, value: T, index: number, collection: T[]) => T): T;

function reduceRight<T, U>(
  collection: ArrayLike<T>,
  iteratee: (accumulator: U, value: T, index: number, collection: ArrayLike<T>) => U,
  initialValue: U
): U;
function reduceRight<T>(
  collection: ArrayLike<T>,
  iteratee: (accumulator: T, value: T, index: number, collection: ArrayLike<T>) => T
): T;

function reduceRight<T extends object, U>(
  collection: T,
  iteratee: (accumulator: U, value: T[keyof T], key: keyof T, collection: T) => U,
  initialValue: U
): U;
function reduceRight<T extends object>(
  collection: T,
  iteratee: (accumulator: T[keyof T], value: T[keyof T], key: keyof T, collection: T) => T[keyof T]
): T[keyof T];
```

### Parameters

- `collection` (`T[] | ArrayLike<T> | Record<PropertyKey, T>`): The collection to iterate over.
- `iteratee` (`(accumulator: U, value: T, index, collection) => any)`): The function invoked per iteration.
- `initialValue` (`U`): The initial value.

### Returns

(`any`): Returns the accumulated value.

## Examples

```typescript
// Using a reducer function
const array = [1, 2, 3];
reduceRight(array, (acc, value) => acc + value, 0); // => 6

// Using a reducer function with initialValue
const array = [1, 2, 3];
reduceRight(array, (acc, value) => acc + value % 2 === 0, true); // => false

// Using an object as the collection
const obj = { a: 1, b: 2, c: 3 };
reduceRight(obj, (acc, value) => acc + value, 0); // => 6
```
