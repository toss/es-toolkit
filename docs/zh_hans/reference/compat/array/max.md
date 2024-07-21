# max

::: info
此函数与 lodash 完全兼容。您可以在我们的[兼容性库](../../../compatibility.md)中找到它，`es-toolkit/compat`。
:::

找到数组中具有最大值的元素。

如果列表为空，则返回 `undefined`。

## 签名

```typescript
function max<T>(items: readonly [T, ...T[]]): T;
function max(): undefined;
function max<T>(items?: T[]): T | undefined;
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
