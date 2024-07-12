# unzip

将一个元素组的数组中相同位置的元素收集起来，并将它们作为一个新数组返回。

## 签名

```typescript
type Unzip<K extends unknown[]> = { [I in keyof K]: Array<K[I]> };
function unzip<T extends unknown[]>(zipped: Array<[...T]>): Unzip<T>;
```

### 参数

- `zipped` (`Array<[...T]>`): 一个包含元素组的数组。

### 返回值

(`Unzip<T>`): 收集同一位置的内部数组元素而创建的新数组。

## 示例

```typescript
unzip([
  ['a', true, 1],
  ['b', false, 2],
]);
// 返回: [['a', 'b'], [true, false], [1, 2]]
```
