# windowed

从给定的输入数组中创建指定大小的小子数组（窗口）。
窗口可以根据给定的 `step` 大小重叠。

默认情况下，结果中只包含长度为 `size` 的完整窗口。
不能形成完整窗口的剩余元素将被忽略。

如果选项对象的 `partialWindows` 设置为 `true`，则结果中也会包含比 `size` 小的部分窗口。
部分窗口是在输入数组中没有足够的元素来形成完整窗口时创建的。

## 签名

```typescript
function windowed<T>(arr: T[], size: number, step: number, { partialWindows = false }: WindowedOptions): T[][];

interface WindowedOptions {
  partialWindows?: boolean;
}
```

### 参数

- `arr` (`readonly T[]`): 用于创建窗口的输入数组。
- `size` (`number`): 每个窗口的大小。必须是正整数。
- `step` (`number`): 每个窗口起始位置之间的步长。必须是正整数。
- `options.partialWindows` (`boolean`): 是否在数组末尾包含部分窗口。

### 返回值

(`T[][]`): 从输入数组创建的窗口（子数组）数组。

## 示例

```typescript
windowed([1, 2, 3, 4], 2);
// => [[1, 2], [2, 3], [3, 4]]

windowed([1, 2, 3, 4, 5, 6], 3, 2);
// => [[1, 2, 3], [3, 4, 5]]

windowed([1, 2, 3, 4, 5, 6], 3, 2, { partialWindows: true });
// => [[1, 2, 3], [3, 4, 5], [5, 6]]
```
