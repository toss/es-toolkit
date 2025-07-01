# pull

从数组中移除所有指定的值。

此函数会直接修改 `arr`。
如果您想在不修改原始数组的情况下删除值，请使用 [difference](./difference.md)。

## 签名

```typescript
function pull<T, U extends T>(arr: T[], valuesToRemove: readonly U[]): T[];
```

### 参数

- `arr` (`T[]`): 要修改的数组。
- `valuesToRemove` (`T[]`): 要从数组中移除的值。

### 返回值

(`T[]`): 移除指定值后的修改数组。

## 示例

```typescript
const numbers = [1, 2, 3, 4, 5, 2, 4];
pull(numbers, [2, 4]);
console.log(numbers); // [1, 3, 5]
```
