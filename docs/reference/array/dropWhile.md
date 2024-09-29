# dropWhile

Removes elements from the beginning of an array until the predicate returns `false`.

This function iterates over an array and drops elements from the start until the provided
predicate function returns `false`. It then returns a new array with the remaining elements.

## Signature

```typescript
function dropWhile<T>(arr: T[], canContinueDropping: (item: T, index: number, arr: T[]) => boolean): T[];
```

### Parameters

- `arr` (`T[]`): The array from which to drop elements.
- `canContinueDropping` (`(item: T, index: number, arr: T[]) => boolean`): A predicate function that determines whether to continue dropping elements. The function is called with each element, and dropping continues as long as it returns `true`.

### Returns

(`T[]`) A new array with the elements remaining after the predicate returns `false`.

## Examples

```typescript
const array = [1, 2, 3, 4, 5];
const result = dropWhile(array, x => x < 3);
// result will be [3, 4, 5] since elements less than 3 are dropped.
```

## Compatibility with Lodash

Import `dropWhile` from `es-toolkit/compat` for full compatibility with lodash.

You can specify the condition for dropping elements, and the array will remove items from the beginning as long as that condition evaluates to true.

- **Predicate function**: You can provide a predicate function that will be applied to each item in the array. The function should return `true` for elements that should be dropped. Dropping continues until the predicate returns `false` for the first time.
- **Partial object**: You can also provide a partial object, and the function will drop elements from the array as long as their properties match the properties of the provided object.
- **Property-value pair**: Alternatively, you can specify a property-value pair, where the function will drop elements that have the specified property matching the given value.
- **Property name**: Lastly, you can provide a property name, and the function will drop elements from the array until it finds an element where the specified property has a truthy value.

### Signature

```typescript
function dropWhile<T>(arr: T[], canContinueDropping: (item: T, index: number, arr: T[]) => unknown): T[];
function dropWhile<T>(arr: T[], objectToDrop: Partial<T>): T[];
function dropWhile<T>(arr: T[], propertyToDrop: [keyof T, unknown]): T[];
function dropWhile<T>(arr: readonly T[], propertyToDrop: string): T[];
```

### Examples

```typescript
// Example using a predicate function
const array1 = [1, 2, 3, 4, 5];
const result1 = dropWhile(array1, x => x < 3);
// result1 will be [3, 4, 5] since elements less than 3 are dropped.

// Example using a partial object
const array2 = [{ a: 1 }, { a: 2 }, { a: 3 }];
const result2 = dropWhile(array2, { a: 1 });
// result2 will be [{ a: 2 }, { a: 3 }] since the first object matches the properties of the provided object.

// Example using a property-value pair
const array3 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const result3 = dropWhile(array3, ['id', 1]);
// result3 will be [{ id: 2 }, { id: 3 }] since the first object has the id property matching the value 1.

// Example using a property name
const array4 = [{ isActive: true }, { isActive: true }, { isActive: false }];
const result4 = dropWhile(array4, 'isActive');
// result4 will be [{ isActive: false }] since it drops elements until it finds one with a falsy isActive property.
```
