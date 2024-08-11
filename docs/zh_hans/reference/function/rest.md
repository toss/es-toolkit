# rest

创建一个函数，调用 `func` 时，`this` 绑定到创建的新函数，并且 `start` 之后的参数作为数组传入。

## 签名

```typescript
function rest<F extends (...args: any[]) => any>(func: F, start: number): (...args: any[]) => ReturnType<F>;
```

### 参数

- `func` (`F`): 要应用的函数。
- `start` (`number`, 可选): rest 参数的开始位置，默认为 `func.length - 1`.

### 返回值

(`(...args: any[]) => ReturnType<F>`): 返回新的函数。

## 示例

```typescript
function fn(a, b, c) {
  return Array.from(arguments);
}

rest(fn)(1, 2, 3, 4); // [1, 2, [3, 4]]
rest(fn, 1)(1, 2, 3, 4); // [1, [2, 3, 4]]
rest(fn)(1); // [1, undefined, []]
```
