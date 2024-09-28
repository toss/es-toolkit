# spread

创建一个新函数，该函数将数组参数的元素展开为原始函数的独立参数。

## 签名

```typescript
function spread<F extends (...args: any[]) => any>(func: F): (argsArr: Parameters<F>) => ReturnType<F>;
```

### 参数

- `func` (`F`): 要转换的函数。它可以是任何具有任意数量参数的函数。

### 返回值

(`(argsArr: Parameters<F>) => ReturnType<F>`): 一个新函数，它接收一个参数数组，并返回调用原始函数时使用这些参数的结果。

## 示例

```typescript
import { spread } from 'es-toolkit/function';

function add(a, b) {
  return a + b;
}
const spreadAdd = spread(add);
console.log(spreadAdd([1, 2])); // 输出: 3

// 展开参数的示例函数
// 创建一个使用 `spread` 来合并参数的新函数
const spreadAdd = spread(add, 1);
// 使用数组作为第二个参数调用 `spreadAdd`
console.log(spreadAdd(1, [2])); // 输出: 3

// 带有默认参数的函数
function greet(name, greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}
// 创建一个使用 `spread` 将参数数组定位在索引 0 的新函数
const spreadGreet = spread(greet, 0);
// 使用参数数组调用 `spreadGreet`
console.log(spreadGreet(['Alice'])); // 输出: Hello, Alice!
console.log(spreadGreet(['Bob', 'Hi'])); // 输出: Hi, Bob!
```

## Lodash 兼容性

从 `es-toolkit/compat` 中导入 `spread` 以实现与 lodash 的完全兼容。

- `spread` 接受一个额外的数值参数 `argsIndex`，该参数指定了参数数组在前面参数中的位置。
  - 如果 `argsIndex` 为负数或 `NaN`，默认为 `0`。如果它是一个小数，则会向下取整为最接近的整数。

```typescript
import { spread } from 'es-toolkit/compat';

function fn(a: unknown, b: unknown, c: unknown) {
  return Array.from(arguments);
}

spread(fn, -1)([1, 2]); // 返回 [1, 2]
spread(fn, NaN)([1, 2]); // 返回 [1, 2]
spread(fn, 'a')([1, 2]); // 返回 [1, 2]
spread(fn, 1.6)(1, [2, 3]); // 返回 [1, 2, 3]
```
