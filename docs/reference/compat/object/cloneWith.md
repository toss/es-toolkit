# cloneWith

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed @here.
:::

Creates a shallow clone of the given object with customization. This method is like `clone` except that it accepts a customizer which is invoked to produce the cloned value. If customizer returns undefined, cloning is handled by the method instead.

If no customizer is provided, it behaves like `clone`.

## Signature

```typescript
function cloneWith<T>(value: T, customizer?: (value: any) => any): T;
```

### Parameters

- `value` (`T`): The value to clone.
- `customizer` (`Function`): Optional. The function to customize cloning.

### Returns

(`T`): A shallow clone of the given object.

## Examples

```typescript
const num = 29;
const clonedNum = cloneWith(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

const arr = [1, 2, 3];
const clonedArr = cloneWith(arr);
console.log(clonedArr); // [1, 2, 3]
console.log(clonedArr === arr); // false

const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
const clonedObj = cloneWith(obj);
console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
console.log(clonedObj === obj); // false

const obj2 = { a: 1, b: 2 };
const clonedObjWithCustomizer = cloneWith(obj2, value => {
  if (typeof value === 'number') {
    return value * 2; // Double the number
  }
  // Returning undefined uses the default cloning
});
console.log(clonedObjWithCustomizer); // { a: 2, b: 4 }
```
