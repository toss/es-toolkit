# fromEntries

将一个二维数组转或Map类型数据转换成对象。和Object.fromEntries实现效果相同，但性能更佳。

## 签名

```typescript
function fromEntries<T extends string | number | symbol, U>(data: Array<[string | number | symbol, U]> | Map<string | number | symbol, U>): { [key in T]: U }
```

### 参数

- `data` (`Array<[string | number | symbol, U]> | Map<string | number | symbol, U>`): 需要转换的二维数组或Map类型数据。二维数组的每个子数组应该有两个元素，第一个元素作为键，第二个元素作为值。

### 返回值

(`{ [key in T]: U }`): 转换后的对象，具有与输入参数相同的键和值。

## 示例

```typescript
const data = [['a', 1], ['b', 2], ['c', 3]];
const result = fromEntries(data);  
// result 将会是 { a: 1, b: 2, c: 3 }
```
