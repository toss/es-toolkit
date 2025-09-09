# forInRight

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

以相反的顺序遍历对象并为每个属性调用 `iteratee` 函数。

以相反的顺序遍历所有字符串键属性，包括继承的属性。

如果 `iteratee` 函数返回 `false`，则提前终止遍历。

## 签名

```typescript
function forInRight<T>(object: T, iteratee?: (value: T[keyof T], key: string, collection: T) => any): T;
function forInRight<T>(
  object: T | null | undefined,
  iteratee?: (value: T[keyof T], key: string, collection: T) => any
): T | null | undefined;
```

### 参数

- `object` (`T | null | undefined`): 要遍历的对象
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`): 每次迭代调用的函数。默认为 `identity` 函数

### 返回值

(`T | null | undefined`): 返回 `object`

## 示例

```typescript
import { forInRight } from 'es-toolkit/compat';

function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
};

// 创建 Shape 的实例
const square = new Shape();

// 以相反的顺序遍历所有可枚举属性（包括继承的属性）
forInRight(square, function (value, key) {
  console.log(key, value);
});
// 按相反顺序输出:
// 'move', [Function]
// 'y', 0
// 'x', 0

// 如果迭代函数返回 false，则提前终止遍历
forInRight(square, function (value, key) {
  console.log(key, value);
  return key !== 'y'; // 在 'y' 处停止
});
// 输出:
// 'move', [Function]
// 'y', 0
```
