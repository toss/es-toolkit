# cloneDeepWith

Deeply clones the given object.

You can customize the deep cloning process using the `cloneValue` function. The function takes the current value `value`, the property name `key`, and the entire object `obj` as arguments. If the function returns a value, that value is used; if it returns `undefined`, the default cloning method is used.

## Signature

```typescript
function cloneDeepWith<T>(
  obj: T,
  cloneValue: (value: any, key: PropertyKey | undefined, obj: T | undefined, stack: Map<any, any>) => any
): T;
```

### Parameters

- `obj` (`T`): The object to clone.
- `cloneValue` (`(value: any, key: PropertyKey | undefined, obj: T | undefined, stack: Map<any, any>) => any`): A function that specifies how to clone the value. It can return a cloned value instead of using the default method. If it returns `undefined`, the default method is used to clone the value.
  - `value`: The current value being cloned.
  - `key`: The property name of the current value being cloned.
  - `obj`: The entire object `obj` to clone.
  - `stack`: An internal stack (`Map`) to handle circular references.

### Returns

(`T`): A deep clone of the given object.

## Examples

```typescript
// Clone a primitive value
const num = 29;
const clonedNum = cloneDeepWith(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

// Clone an object with a customizer
const obj = { a: 1, b: 2 };
const clonedObj = cloneDeepWith(obj, value => {
  if (typeof value === 'number') {
    return value * 2; // Double the number
  }
});
console.log(clonedObj); // { a: 2, b: 4 }
console.log(clonedObj === obj); // false

// Clone an array with a customizer
const arr = [1, 2, 3];
const clonedArr = cloneDeepWith(arr, value => {
  return value + 1; // Increment each value
});
console.log(clonedArr); // [2, 3, 4]
console.log(clonedArr === arr); // false
```
