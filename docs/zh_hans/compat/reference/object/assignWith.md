# assignWith (Lodash 兼容性)

::: warning 建议实现自定义逻辑

这个 `assignWith` 函数由于复杂的自定义函数处理而相对较慢。

请改用 `Object.assign` 并直接实现自定义逻辑。

:::

使用自定义函数将源对象的属性分配给目标对象。

```typescript
const result = assignWith(target, source1, source2, customizer);
```

## 用法

### `assignWith(object, ...sources, customizer)`

当您想要自定义属性分配方式时,请使用 `assignWith`。自定义函数决定每个属性的最终值。

```typescript
import { assignWith } from 'es-toolkit/compat';

// 基本用法 - 仅在undefined时分配
const target = { a: 1, b: undefined };
const source = { b: 2, c: 3 };
const result = assignWith(target, source, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// Returns: { a: 1, b: 2, c: 3 }

// 数组合并
const target2 = { users: ['alice'] };
const source2 = { users: ['bob', 'charlie'] };
const result2 = assignWith(target2, source2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// Returns: { users: ['alice', 'bob', 'charlie'] }

// 多个源与自定义函数
const target3 = { a: 1 };
const result3 = assignWith(target3, { b: 2 }, { c: 3 }, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// Returns: { a: 1, b: 2, c: 3 }
```

#### 参数

- `object` (`any`): 将被分配属性的目标对象。
- `...sources` (`any[]`): 要复制属性的源对象。
- `customizer` (`function`): 决定要分配的值的函数。格式为 `(objValue, srcValue, key, object, source) => any`。

#### 返回值

(`any`): 返回由自定义函数决定值的目标对象。
