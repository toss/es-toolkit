# remove

根据谓词函数从数组中移除元素。

此函数会直接修改 `arr`。
如果希望在不修改原始数组的情况下移除元素，请使用 [Array.prototype.filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)。

## 签名

```typescript
function remove<T>(arr: T[], shouldRemoveElement: (value: T, index: number, array: T[]) => boolean): T[];
```

### 参数

- `arr` (`T[]`): 要修改的数组。
- `shouldRemoveElement` (`(value: T, index: number, array: T[]) => boolean`): 每次迭代时调用的函数，用于确定是否应移除某个元素。

### 返回值

(`T[]`): 移除指定元素后的修改数组。

## 示例

```typescript
const numbers = [1, 2, 3, 4, 5];
remove(numbers, value => value % 2 === 0);
console.log(numbers); // [1, 3, 5]
```
