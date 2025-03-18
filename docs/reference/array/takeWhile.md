# takeWhile

Returns a new array containing the leading elements of the provided array
that satisfy the provided predicate function. It stops taking elements as soon
as an element does not satisfy the predicate.

## Signature

```typescript
function takeWhile<T>(arr: T[], shouldContinueTaking: (element: T) => boolean): T[];
```

### Parameters

- `arr` (`T[]`): The array to take elements from.
- `shouldContinueTaking` (`(item: T) => boolean`) The predicate function that is called with each element. Elements are included in the result as long as this function returns true.

### Returns

(`T[]`) A new array containing the elements taken from the beginning while the predicate returns `true`.

## Examples

```typescript
// Returns [1, 2]
takeWhile([1, 2, 3, 4], x => x < 3);

// Returns []
takeWhile([1, 2, 3, 4], x => x > 3);
```

## Compatibility with Lodash

Import `takeWhile` from `es-toolkit/compat` for full compatibility with Lodash.

You can specify the condition for taking elements, and the array will include items from the beginning as long as that condition evaluates to truthy.

- **Predicate function**: You can provide a predicate function that will be applied to each item in the array. The function should return truthy for elements that should be taken. Taking continues until the predicate returns falsey for the first time.
- **Partial object**: You can also provide a partial object, and the function will take elements from the array as long as their properties match the properties of the provided object.
- **Property-value pair**: Alternatively, you can specify a property-value pair, where the function will take elements that have the specified property matching the given value.
- **Property name**: Lastly, you can provide a property name, and the function will take elements from the array until it finds an element where the specified property has a falsy value.

### Signature

```typescript
function takeWhile<T>(array: ArrayLike<T> | null | undefined): T[];
function takeWhile<T>(
  array: ArrayLike<T> | null | undefined,
  predicate: (item: T, index: number, array: T[]) => unknown
): T[];
function takeWhile<T>(array: ArrayLike<T> | null | undefined, matches: Partial<T>): T[];
function takeWhile<T>(array: ArrayLike<T> | null | undefined, matchesProperty: [keyof T, unknown]): T[];
function takeWhile<T>(array: ArrayLike<T> | null | undefined, property: PropertyKey): T[];
```

### Examples

```typescript
// Example using a predicate function
const array1 = [1, 2, 3, 4, 5];
const result1 = takeWhile(array1, x => x < 3);
// result1 will be [1, 2] since elements less than 3 are taken from the beginning.

// Example using a partial object
const array2 = [{ a: 3 }, { a: 2 }, { a: 1 }];
const result2 = takeWhile(array2, { a: 3 });
// result2 will be [{ a: 3 }] since the first object matches the properties of the provided object.

// Example using a property-value pair
const array3 = [{ id: 3 }, { id: 2 }, { id: 1 }];
const result3 = takeWhile(array3, ['id', 3]);
// result3 will be [{ id: 3 }] since the first object has the id property matching the value 3.

// Example using a property name
const array4 = [{ isActive: true }, { isActive: true }, { isActive: false }];
const result4 = takeWhile(array4, 'isActive');
// result4 will be [{ isActive: true }, { isActive: true }] since elements with a truthy isActive property are taken from the beginning.

// Example with no predicate provided
const array5 = [1, 2, 3];
const result5 = takeWhile(array5);
// result5 will be [1, 2, 3] since the identity function is used by default.

// null or undefined array
const result6 = takeWhile(null);
// result6 will be [] since the input array is null.
```
