# before

创建一个新函数，该函数限制给定函数 (`func`) 被调用的次数。

## 签名

```typescript
function before<F extends (...args: any[]) => any>(
  n: number,
  func: F
): (...args: Parameters<F>) => ReturnType<F> | undefined;
```

### 参数

- `n` (`number`): 返回的函数在停止之前允许调用 func 的次数。
  - 如果 `n` 为 0，则不会调用 ·。
  - 如果 `n` 是正整数，则 `func` 最多被调用 `n-1` 次。
- `func` (`F`): 需要应用调用限制的函数。

### 返回值

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): 一个新函数，该函数：

- 追踪调用次数。
- 在调用次数达到 `n-1` 次之前调用 `func`。
- 如果调用次数达到或超过 `n`，返回 `undefined`，并停止进一步调用。

### 抛出异常

如果 `n` 不是非负整数，则抛出错误。

## 示例

```typescript
import { before } from 'es-toolkit/function';

const beforeFn = before(3, () => {
  console.log('called');
});

// 将会打印 'called'.
beforeFn();

// 将会打印 'called'.
beforeFn();

// 不会打印 anything.
beforeFn();
```

## Lodash 兼容性

从 `es-toolkit/compat` 中导入 `before` 以实现与 lodash 的完全兼容。

- `n` 为负数时不会抛出错误。
- 如果 `func` 不是一个函数，会抛出错误。
- 当调用次数达到或超过 `n` 时，`before` 返回 `func` 的最后结果。

```typescript
import { before } from 'es-toolkit/compat';

let count = 0;

const before3 = before(3, () => {
  console.log('正在增加计数...');
  return ++count;
});

console.log(before3()); // 正在增加计数... => 1
console.log(before3()); // 正在增加计数... => 2
console.log(before3()); //              => 2
```