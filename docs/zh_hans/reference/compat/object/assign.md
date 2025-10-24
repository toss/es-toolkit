# assign (Lodash 兼容性)

::: warning 请使用 `Object.assign`

这个 `assign` 函数由于需要检查值是否相等的额外逻辑而运行缓慢。

请改用更快、更现代的 `Object.assign`。

:::

将源对象的属性分配给目标对象。

```typescript
const result = assign(target, ...sources);
```

## 参考

### `assign(target, ...sources)`

当您想将一个或多个源对象的属性复制到目标对象时,请使用 `assign`。如果有相同的键,后面的源的值将覆盖前面的值。

```typescript
import { assign } from 'es-toolkit/compat';

// 基本用法
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = assign(target, source);
// 结果: { a: 1, b: 3, c: 4 }
console.log(target === result); // true (目标对象被修改)

// 合并多个源对象
const target2 = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
const source3 = { d: 4 };
assign(target2, source1, source2, source3);
// 结果: { a: 1, b: 2, c: 3, d: 4 }

// 覆盖属性
const target3 = { x: 1, y: 2 };
const source4 = { y: 3, z: 4 };
const source5 = { y: 5 };
assign(target3, source4, source5);
// 结果: { x: 1, y: 5, z: 4 } (y 被最后一个值覆盖)
```

此函数仅复制对象的自有属性,不复制继承的属性。如果值相同,它还会进行优化,不会覆盖。

#### 参数

- `target` (`any`): 将接收属性的目标对象。
- `...sources` (`any[]`): 要复制属性的源对象。

#### 返回值

(`any`): 返回修改后的目标对象。目标对象本身被修改并返回。
