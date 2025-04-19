# hasIn

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

检查给定路径在对象中是否存在，**包括继承的属性**。

您可以提供路径作为单个属性键、属性键数组，或表示深层路径的字符串。

与仅检查自有属性的 `has` 不同，`hasIn` 也会检查原型链中的属性。

如果路径是索引，且对象是数组或参数对象，函数将验证索引是否有效，并且在数组或参数对象的范围内，
即使数组或参数对象是稀疏的（即，并非所有索引都被定义）。

## 签名

```typescript
function hasIn(object: unknown, path: string | number | symbol | Array<string | number | symbol>): boolean;
```

### 参数

- `object` (`unknown`): 要查询的对象。
- `path` (`string` 或 `number` 或 `symbol` 或 `Array<string | number | symbol>`): 要检查的路径。这可以是单个属性键、属性键数组或表示深层路径的字符串。

### 返回值

(`boolean`): 如果路径在对象中存在（无论是自有属性还是继承属性），则返回 `true`，否则返回 `false`。

## 示例

```typescript
import { has, hasIn } from 'es-toolkit/compat';

const obj = { a: { b: { c: 3 } } };

hasIn(obj, 'a'); // true
hasIn(obj, ['a', 'b']); // true
hasIn(obj, ['a', 'b', 'c']); // true
hasIn(obj, 'a.b.c'); // true
hasIn(obj, 'a.b.d'); // false
hasIn(obj, ['a', 'b', 'c', 'd']); // false

// 继承属性示例:
function Rectangle() {}
Rectangle.prototype.area = function () {};

const rect = new Rectangle();
hasIn(rect, 'area'); // true - hasIn 检查自有和继承的属性
has(rect, 'area'); // false - has 只检查自有属性
```

## 演示

::: sandpack

```ts index.ts
import { has, hasIn } from 'es-toolkit/compat';

// 继承属性示例
function Rectangle() {
  this.width = 10;
  this.height = 5;
}
Rectangle.prototype.area = function () {
  return this.width * this.height;
};

const rect = new Rectangle();

console.log('hasIn(rect, "area"):', hasIn(rect, 'area')); // true - 检查继承属性
console.log('has(rect, "area"):', has(rect, 'area')); // false - 只检查自有属性
console.log('hasIn(rect, "width"):', hasIn(rect, 'width')); // true - 自有属性
```

:::
</rewritten_file>
