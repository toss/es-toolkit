# assignInWith (Lodash 兼容性)

::: warning 建议实现自定义逻辑

这个 `assignInWith` 函数由于继承属性处理和自定义函数调用而以复杂且缓慢的方式运行。

请改用 `Object.assign` 并直接实现自定义逻辑。

:::

使用自定义函数将源对象的所有属性(包括继承属性)分配给目标对象。

```typescript
const result = assignInWith(target, ...sources, customizer);
```

## 参考

### `assignInWith(target, ...sources, customizer)`

当您想要在包含继承属性的同时自定义属性分配方式时,请使用 `assignInWith`。自定义函数决定每个属性的最终值。

```typescript
import { assignInWith } from 'es-toolkit/compat';

// 基本用法 - 仅在undefined时分配
const target = { a: 1, b: undefined };
const source = { b: 2, c: 3 };
const result = assignInWith(target, source, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// 结果: { a: 1, b: 2, c: 3 }

// 合并数组值的自定义函数
const target2 = { numbers: [1, 2] };
const source2 = { numbers: [3, 4], name: 'test' };
assignInWith(target2, source2, (objValue, srcValue) => {
  if (Array.isArray(objValue) && Array.isArray(srcValue)) {
    return objValue.concat(srcValue);
  }
  return srcValue;
});
// 结果: { numbers: [1, 2, 3, 4], name: 'test' }

// 也处理继承的属性
function Parent() {}
Parent.prototype.inherited = 'value';
const child = Object.create(Parent.prototype);
child.own = 'ownValue';

const target3 = { existing: 'data' };
assignInWith(target3, child, (objValue, srcValue, key) => {
  if (objValue === undefined) {
    return `processed_${srcValue}`;
  }
  return objValue;
});
// 结果: { existing: 'data', own: 'processed_ownValue', inherited: 'processed_value' }
```

如果自定义函数返回 `undefined`,则使用默认的分配行为。与 `assignIn` 不同,此函数允许您对每个属性应用自定义逻辑。

#### 参数

- `target` (`any`): 将接收属性的目标对象。
- `...sources` (`any[]`): 要复制属性的源对象。自有属性和继承属性都会被复制。
- `customizer` (`function`): 决定要分配的值的函数。格式为 `(objValue, srcValue, key, object, source) => any`。如果返回 `undefined`,则使用默认的分配行为。

#### 返回值

(`any`): 返回修改后的目标对象。目标对象本身被修改并返回。
