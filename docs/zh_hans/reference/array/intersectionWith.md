# intersectionWith

返回基于自定义相等函数的两个数组的交集。

该函数接受两个数组和一个自定义相等函数。它返回一个新数组，该数组包含从第一个数组中选取的元素，这些元素在使用提供的自定义相等函数进行比较时，在第二个数组中有匹配的元素。

它有效地过滤掉第一个数组中根据相等函数没有在第二个数组中具有对应匹配的元素。

## 签名

```typescript
function intersectionWith<T>(firstArr: T[], secondArr: T[], areItemsEqual: (x: T, y: T) => boolean): T[];
```

### 参数

- `firstArr` (`T[]`): 要比较的第一个数组。
- `secondArr` (`T[]`): 要比较的第二个数组。
- `areItemsEqual` (`(x: T, y: T) => boolean`): 一个自定义函数，用于确定两个元素是否相等。该函数接受两个参数，分别来自每个数组，如果这两个元素被认为相等，则返回 true，否则返回 false。

### 返回值

(`T[]`) 包含第一个数组中具有第二个数组中对应匹配的元素的新数组。

## 示例

```typescript
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;
const result = intersectionWith(array1, array2, areItemsEqual);
// 结果将是 [{ id: 2 }] 因为这个元素在两个数组中具有匹配的 id。
```
