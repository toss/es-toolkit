# size

::: info
This function is fully compatible with lodash. You can find it in our [compatibility library](../../../compatibility.md), `es-toolkit/compat`.
:::

返回数组、字符串或对象的大小。

此函数接收一个数组、字符串或对象并返回其大小。对于数组和字符串，它分别返回元素或字符的数量。对于对象，它返回可枚举属性的数量。


## 签名

```typescript
function size<T>(value: T[] | object | string | Map<unknown, T> | Set<T> | null | undefined): number;
```

### 参数

- value (`T`): 要确定大小的数组、字符串或对象。

### 返回值

(`number`): 输入值的大小。

## 示例

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
