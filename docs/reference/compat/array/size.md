# size

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Returns the size of an array, string, or object.

This function takes an array, string, or object and returns its size. For arrays and strings, it returns the number of elements or characters, respectively. For objects, it returns the number of enumerable properties.

## Signature

```typescript
function size<T>(value: T[] | object | string | Map<unknown, T> | Set<T> | null | undefined): number;
```

### Parameters

- `value` (`T`): The array, string, or object whose size is to be determined.

### Returns

(`number`): The size of the input value.

## Examples

```typescript
const arr = [1, 2, 3];
const arrSize = size(arr);
// arrSize will be 3

const str = 'hello';
const strSize = size(str);
// strSize will be 5

const obj = { a: 1, b: 2, c: 3 };
const objSize = size(obj);
// objSize will be 3

const emptyArr = [];
const emptyArrSize = size(emptyArr);
// emptyArrSize will be 0

const emptyStr = '';
const emptyStrSize = size(emptyStr);
// emptyStrSize will be 0

const emptyObj = {};
const emptyObjSize = size(emptyObj);
// emptyObjSize will be 0
```
