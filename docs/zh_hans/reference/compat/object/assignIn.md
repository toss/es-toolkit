# assignIn (Lodash 兼容性)

::: warning 请使用 `Object.assign`

这个 `assignIn` 函数由于需要复制继承属性的额外处理和值比较逻辑而运行缓慢。

请改用更快、更现代的 `Object.assign`。

:::

将源对象的所有属性(包括继承的属性)分配给目标对象。

```typescript
const result = assignIn(target, ...sources);
```

## 参考

### `assignIn(target, ...sources)`

当您想将源对象的自有属性和继承属性都复制到目标对象时,请使用 `assignIn`。与 `assign` 不同,它包括原型链中的属性。

```typescript
import { assignIn } from 'es-toolkit/compat';

// 基本用法
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = assignIn(target, source);
// 结果: { a: 1, b: 3, c: 4 }
console.log(target === result); // true (目标对象被修改)

// 合并多个源对象
const target2 = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
assignIn(target2, source1, source2);
// 结果: { a: 1, b: 2, c: 3 }

// 也复制继承的属性
function Parent() {}
Parent.prototype.inherited = 'inheritedValue';
const child = Object.create(Parent.prototype);
child.own = 'ownValue';

const target3 = {};
assignIn(target3, child);
// 结果: { own: 'ownValue', inherited: 'inheritedValue' }

// 也复制数组的索引属性和length等
const arr = [1, 2, 3];
arr.customProp = 'custom';
const target4 = {};
assignIn(target4, arr);
// 结果: { '0': 1, '1': 2, '2': 3, customProp: 'custom', length: 3 }
```

与 `assign` 不同,此函数也复制继承的属性。如果值相同,它还会进行优化,不会覆盖。

#### 参数

- `target` (`any`): 将接收属性的目标对象。
- `...sources` (`any[]`): 要复制属性的源对象。自有属性和继承属性都会被复制。

#### 返回值

(`any`): 返回修改后的目标对象。目标对象本身被修改并返回。
