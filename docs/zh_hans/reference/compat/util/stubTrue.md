# stubTrue (Lodash 兼容性)

::: warning 使用 `true` 字面量

这个 `stubTrue` 函数由于不必要的函数调用而运行缓慢。

改为使用更快、更现代的 `true` 字面量。

:::

始终返回 `true` 值。

```typescript
const result = stubTrue();
```

## 用法

### `stubTrue()`

当需要始终返回 `true` 值的回调函数或默认值时，使用 `stubTrue`。在数组方法的过滤或条件逻辑中提供一致的 `true` 值时很有用。

```typescript
import { stubTrue } from 'es-toolkit/compat';

// 保留数组中所有元素的过滤器
const items = [1, 2, 3, 4, 5];
const allItems = items.filter(stubTrue);
console.log(allItems); // [1, 2, 3, 4, 5]
```

也可以在条件设置中作为默认值使用。

```typescript
import { stubTrue } from 'es-toolkit/compat';

// 默认启用的选项
const defaultOptions = {
  enableFeatureA: stubTrue(),
  enableFeatureB: stubTrue(),
  enableFeatureC: stubTrue(),
};

console.log(defaultOptions); // { enableFeatureA: true, enableFeatureB: true, enableFeatureC: true }
```

#### 参数

无参数。

#### 返回值

(`boolean`): 始终返回 `true`。
