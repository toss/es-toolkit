# mergeWith (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `mergeWith`

这个 `mergeWith` 函数由于复杂的类型检查、循环引用处理和特殊对象处理而相对较慢。

请改用更快、更现代的 `es-toolkit` 的 [`mergeWith`](../../object/mergeWith.md)。

:::

使用自定义函数控制合并行为,深度合并多个对象。

```typescript
const result = mergeWith(target, ...sources, customizer);
```

## 参考

### `mergeWith(object, ...sources, customizer)`

将一个或多个源对象深度合并到目标对象中,使用自定义函数控制合并行为。如果自定义函数返回 `undefined`,则使用默认合并逻辑。适用于连接数组或应用特殊合并规则。

```typescript
import { mergeWith } from 'es-toolkit/compat';

// 数字相加
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const result = mergeWith(obj1, obj2, (objValue, srcValue) => {
  if (typeof objValue === 'number' && typeof srcValue === 'number') {
    return objValue + srcValue;
  }
});
// 结果: { a: 1, b: 5, c: 4 }

// 连接数组
const arr1 = { items: [1, 2] };
const arr2 = { items: [3, 4] };
const merged = mergeWith(arr1, arr2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// 结果: { items: [1, 2, 3, 4] }

// 连接字符串
const str1 = { message: 'Hello' };
const str2 = { message: 'World' };
const combined = mergeWith(str1, str2, (objValue, srcValue, key) => {
  if (key === 'message' && typeof objValue === 'string') {
    return objValue + ' ' + srcValue;
  }
});
// 结果: { message: 'Hello World' }

// 多个源对象与自定义函数
const base = { scores: [80] };
const quiz1 = { scores: [90] };
const quiz2 = { scores: [85] };
const final = mergeWith(base, quiz1, quiz2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// 结果: { scores: [80, 90, 85] }
```

自定义函数接收各种参数。

```typescript
import { mergeWith } from 'es-toolkit/compat';

const customizer = (objValue, srcValue, key, object, source, stack) => {
  console.log('合并中:', key, objValue, '->', srcValue);

  // 仅对特定键进行自定义
  if (key === 'specialField') {
    return `${objValue}_${srcValue}`;
  }

  // 返回undefined使用默认合并逻辑
  return undefined;
};
```

#### 参数

- `object` (`any`): 要合并到的目标对象。此对象会被修改。
- `...sources` (`any[]`): 要合并的源对象。
- `customizer` (`MergeWithCustomizer`): 自定义值分配的函数。格式: `(objValue, srcValue, key, object, source, stack) => any`。

#### 返回值

(`any`): 返回合并后的目标对象。
