# spread

创建一个函数，该函数调用 `func`，使用创建函数的 `this` 绑定和一个类似于 [`Function#apply`](https://www.ecma-international.org/ecma-262/6.0/#sec-function.prototype.apply) 的参数数组。

## 签名

```typescript
function spread<F extends (...args: any[]) => any>(func: F, startIndex: number = 0): (...args: any[]) => ReturnType<F>;
```

### 参数

- `func` (`F`): 用于展开参数的函数。
- `startIndex` (`number`, 可选): 参数的开始位置，默认为 `0`。

### 返回值

(`(...args: any[]) => ReturnType<F>`): 一个新的函数，该函数使用展开的参数调用 `func`。

## 示例

```typescript
import { spread } from 'es-toolkit/function';

const say = spread(function (who, what) {
  return who + ' says ' + what;
});

say(['fred', 'hello']);
// => 'fred says hello'
```

## Lodash 兼容性

从 `es-toolkit/compat` 中导入 `spread` 以实现与 lodash 的完全兼容。

- `spread` 当给定的 `startIndex` 小于 0 或为 `NaN` 时将其视为 `0`。
- `spread` 接受分数值的 `startIndex`，但将其强制转换为整数。

```typescript
import { spread } from 'es-toolkit/compat';

function fn(a: unknown, b: unknown, c: unknown) {
  return Array.from(arguments);
}

spread(fn, -1)([1, 2]); // Returns [1, 2]
spread(fn, NaN)([1, 2]); // Returns [1, 2]
spread(fn, 'a')([1, 2]); // Returns [1, 2]
spread(fn, 1.6)(1, [2, 3]); // Returns [1, 2, 3]
```
