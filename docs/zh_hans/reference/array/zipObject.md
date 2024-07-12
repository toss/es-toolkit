# zipObject

将两个数组合并为一个对象，一个数组包含属性名称，另一个数组包含对应的值。

该函数接受两个数组作为输入：一个包含属性名称，另一个包含相应的值。它返回一个新对象，其中第一个数组中的属性名称作为键，第二个数组中对应的元素作为值。

如果 `keys` 数组的长度大于 `values` 数组的长度，则剩余的键将具有 `undefined` 作为它们的值。

## 签名

```typescript
function zipObject<P extends string | number | symbol, V>(keys: P[], values: V[]): { [K in P]: V };
```

### 参数

- `keys` (`P[]`): 属性名称的数组。
- `values` (`V[]`): 与属性名称对应的值的数组。

### 返回值

(`{ [K in P]: V }`): 由给定的属性名称和值组成的新对象。

## 示例

```typescript
const keys = ['a', 'b', 'c'];
const values = [1, 2, 3];
const result = zipObject(keys, values);
// result 将会是 { a: 1, b: 2, c: 3 }

const keys2 = ['a', 'b', 'c'];
const values2 = [1, 2];
const result2 = zipObject(keys2, values2);
// result2 将会是 { a: 1, b: 2, c: undefined }

const keys3 = ['a', 'b'];
const values3 = [1, 2, 3];
const result3 = zipObject(keys3, values3);
// result3 将会是 { a: 1, b: 2 }
```
