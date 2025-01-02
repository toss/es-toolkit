# takeRightWhile

Takes elements from the end of the array while the predicate function returns `true`.

## Signature

```typescript
function takeRightWhile<T>(arr: T[], shouldContinueTaking: (item: T) => boolean): T[];
```

### Parameters

- `arr` (`T[]`): The array to take elements from.
- `shouldContinueTaking` (`(item: T) => boolean`): The predicate function that is called with each element. Elements are included in the result as long as this function returns true.

### Returns

(`T[]`) A new array containing the elements taken from the end while the predicate returns `true`.

## Examples

```typescript
// Returns [3, 2, 1]
takeRightWhile([5, 4, 3, 2, 1], n => n < 4);

// Returns []
takeRightWhile([1, 2, 3], n => n > 3);
```

## Compatibility with Lodash

Import `takeRightWhile` from `es-toolkit/compat` for full compatibility with Lodash.

You can specify the condition for taking elements, and the array will include items from the end as long as that condition evaluates to truthy.

- **Predicate function**: You can provide a predicate function that will be applied to each item in the array. The function should return truthy for elements that should be taken. Taking continues until the predicate returns falsey for the first time.
- **Partial object**: You can also provide a partial object, and the function will take elements from the array as long as their properties match the properties of the provided object.
- **Property-value pair**: Alternatively, you can specify a property-value pair, where the function will take elements that have the specified property matching the given value.
- **Property name**: Lastly, you can provide a property name, and the function will take elements from the array until it finds an element where the specified property has a falsy value.

### Signature

```typescript
function takeRightWhile<T>(array: ArrayLike<T> | null | undefined): T[];
function takeRightWhile<T>(
  array: ArrayLike<T> | null | undefined,
  predicate: (item: T, index: number, array: T[]) => unknown
): T[];
function takeRightWhile<T>(array: ArrayLike<T> | null | undefined, matches: Partial<T>): T[];
function takeRightWhile<T>(array: ArrayLike<T> | null | undefined, matchesProperty: [keyof T, unknown]): T[];
function takeRightWhile<T>(array: ArrayLike<T> | null | undefined, property: PropertyKey): T[];
```

### Examples

```typescript
// Example using a predicate function
const array1 = [1, 2, 3, 4, 5];
const result1 = takeRightWhile(array1, x => x > 3);
// result1 will be [4, 5] since elements greater than 3 are taken from the end.

// Example using a partial object
const array2 = [{ a: 1 }, { a: 2 }, { a: 3 }];
const result2 = takeRightWhile(array2, { a: 3 });
// result2 will be [{ a: 3 }] since the last object matches the properties of the provided object.

// Example using a property-value pair
const array3 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const result3 = takeRightWhile(array3, ['id', 3]);
// result3 will be [{ id: 3 }] since the last object has the id property matching the value 3.

// Example using a property name
const array4 = [{ isActive: false }, { isActive: true }, { isActive: true }];
const result4 = takeRightWhile(array4, 'isActive');
// result4 will be [{ isActive: true }, { isActive: true }] since elements with a truthy isActive property are taken from the end.

// Example with no predicate provided
const array5 = [1, 2, 3];
const result5 = takeRightWhile(array5);
// result5 will be [1, 2, 3] since the identity function is used by default.

// null or undefined array
const result6 = takeRightWhile(null);
// result6 will be [] since the input array is null.
```
