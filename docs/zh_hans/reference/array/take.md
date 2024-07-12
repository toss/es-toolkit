# take

返回一个新数组，其中包含从输入数组 `arr` 中获取的前 `count` 个元素。

如果 `count` 大于 `arr` 的长度，则返回整个数组。

## 签名

```typescript
function take<T>(arr: T[], count: number): T[];
```

### 参数

- `arr` (`T[]`): 要提取元素的数组。
- `count` (`number`): 要提取的元素数量。

### 返回值

(`T[]`): 包含从 `arr` 中取出的前 `count` 个元素的新数组。

## 示例

```typescript
// 返回 [1, 2, 3]
take([1, 2, 3, 4, 5], 3);

// 返回 ['a', 'b']
take(['a', 'b', 'c'], 2);

// 返回 [1, 2, 3]
take([1, 2, 3], 5);
```
