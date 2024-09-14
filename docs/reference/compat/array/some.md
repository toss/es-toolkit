# some

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if there is an element in an array that matches the given predicate.

You can specify the condition in several ways:

- **Predicate function**: If you provide a predicate function, the function will be applied to each item. The first item that makes the predicate function return `true` will be selected.
- **Partial object**: If you provide a partial object, the function will return the first item that matches the properties of the partial object.
- **Property-value pair**: If you provide a property-value pair, the function will return the first item that matches the property and value from the pair.
- **Property name**: If you provide a property name, the function will return the first item where the specified property has a truthy value.

If no predicate is provided, the function checks if there is any truthy element in the array.

## Signature

```typescript
function some<T>(arr: T[]): boolean;
function some<T>(arr: T[], predicate: (item: T, index: number, arr: any) => unknown): boolean;
function some<T>(arr: T[], predicate: [keyof T, unknown]): boolean;
function some<T>(arr: T[], predicate: string): boolean;
function some<T>(arr: T[], predicate: Partial<T>): boolean;
```

### Parameters

- `arr` (`T[]`): The array to iterate over.
- `predicate` (`((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | string`):
  - **Predicate function** (`(item: T, index: number, arr: T[]) => unknown`): A function that takes an item, its index, and the array, and returns a truthy value if the item matches the criteria.
  - **Partial object** (`Partial<T>`): A partial object that specifies the properties to match.
  - **Property-value pair** (`[keyof T, unknown]`): An array where the first element is the property key and the second element is the value to match.
  - **Property name** (`string`): The name of the property to check for a truthy value.

### Returns

(`boolean`): Returns `true` if any element passes the predicate check, else `false`.

## Examples

```typescript
some([1, 2, 3, 4], n => n % 2 === 0);
// => true

some([{ a: 1 }, { a: 2 }, { a: 3 }], { a: 2 });
// => true

some([{ a: 1 }, { a: 2 }, { a: 3 }], ['a', 2]);
// => true

some([{ a: 1 }, { a: 2 }, { a: 3 }], 'a');
// => true
```
