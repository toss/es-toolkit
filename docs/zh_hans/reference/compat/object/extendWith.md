# extendWith (Lodash 兼容性)

::: warning 请使用 `Object.assign()` 和自定义函数

此 `extendWith` 函数由于处理原型链中的继承属性和自定义合并逻辑,运行复杂且缓慢。

请使用更快、更现代的 `Object.assign()` 和自定义函数。

:::

使用自定义函数将对象的自有属性和继承属性复制到另一个对象。

```typescript
const result = extendWith(object, source, customizer);
```

## 参考

### `extendWith(object, ...sources, customizer)`

使用 `extendWith` 通过自定义逻辑合并对象属性。它类似于 `extend`,但允许您决定如何合并每个属性。此函数是 `assignInWith` 的别名。

```typescript
import { extendWith } from 'es-toolkit/compat';

// 使用自定义合并逻辑复制属性
const target = { a: 1, b: 2 };
extendWith(target, { b: 3, c: 4 }, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// 返回值: { a: 1, b: 2, c: 4 }

// 连接数组的自定义合并
const obj1 = { a: [1, 2] };
const obj2 = { a: [3, 4], b: [5, 6] };
extendWith(obj1, obj2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// 返回值: { a: [1, 2, 3, 4], b: [5, 6] }
```

可以使用多个源对象。

```typescript
import { extendWith } from 'es-toolkit/compat';

extendWith({ a: 1 }, { b: 2 }, { c: 3 }, (objValue, srcValue) => srcValue * 2);
// 返回值: { a: 1, b: 4, c: 6 }
```

#### 参数

- `object` (`any`): 接收属性的目标对象。
- `...sources` (`any[]`): 提供属性的源对象。
- `customizer` (`function`): 确定每个属性要分配的值的函数。它接收 `(objValue, srcValue, key, object, source)`。

#### 返回值

(`any`): 返回复制了属性的对象。第一个参数 `object` 会被修改。
