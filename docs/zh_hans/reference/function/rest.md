# rest

创建一个函数，该函数会转换提供的函数 `func` 的参数。
转换后的参数会传递给 `func`，使得从指定索引开始的参数被分组到一个数组中，而之前的参数则作为单独的元素传递。

## 签名

```typescript
function rest<F extends (...args: any[]) => any>(func: F, startIndex: number): (...args: any[]) => ReturnType<F>;
```

### 参数

- `func` (`F`): 需要转换参数的函数。
- `startIndex` (`number`, 可选):从哪个索引开始将剩余的参数分组到数组中。默认为 `func.length - 1`，即将最后一个参数后的所有参数分组。

### 返回值

(`(...args: any[]) => ReturnType<F>`): 一个新函数，当被调用时，返回使用转换后的参数调用 `func` 的结果。

- 转换后的参数为：
  - 前 `start` 个参数作为单独的元素。
  - 从索引 `start` 开始的剩余参数被分组到一个数组中。

## 示例

```typescript
function fn(a, b, c) {
  return Array.from(arguments);
}

// 使用默认起始索引 (func.length - 1，即在此例中为 2)
const func1 = rest(fn);
console.log(func1(1, 2, 3, 4)); // [1, 2, [3, 4]]

// 使用起始索引 1
const func2 = rest(fn, 1);
console.log(func2(1, 2, 3, 4)); // [1, [2, 3, 4]]

// 参数少于起始索引
console.log(func1(1)); // [1, undefined, []]
```
