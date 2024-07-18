# max

找到数组中具有最大值的元素。

如果列表为空，则返回 `undefined`。

## 签名

```typescript
function max<T>(items: T[]): T;
```

### 参数

- `items` (`T[]`): 要搜索的元素数组。

### 返回

(`T`): 具有最大值的元素。

### 示例

```typescript
max([1, 2, 3]); // Returns: 3
max(['a', 'b']); // Returns: 'b'
```
