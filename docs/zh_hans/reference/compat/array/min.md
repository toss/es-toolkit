# min

::: info
此函数与 lodash 完全兼容。您可以在我们的[兼容性库](../../../compatibility.md)中找到它，`es-toolkit/compat`。
:::

找到数组中具有最小值的元素。

如果列表为空，则返回 `undefined`。

## 签名

```typescript
function min<T>(items: [T, ...T[]]): T;
function min(): undefined;
function min<T>(items?: T[]): T | undefined;
```

### 参数

- `items` (`T[]`): 要搜索的元素数组。

### 返回

具有最小值的元素。

### 示例

```typescript
min([1, 2, 3]); // Returns: 1
min(['a', 'b']); // Returns: 'a'
```
