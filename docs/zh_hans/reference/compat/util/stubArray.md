# stubArray (Lodash 兼容性)

::: warning 直接使用 `[]`

这个 `stubArray` 函数是一个简单返回空数组的包装函数，是不必要的抽象。

改为使用更快、更直接的 `[]`。

:::

始终返回新的空数组。

```typescript
const emptyArray = stubArray();
```

## 用法

### `stubArray()`

始终返回新空数组的函数。当需要空数组作为默认值或在函数式编程中需要一致的返回值时使用。

```typescript
import { stubArray } from 'es-toolkit/compat';

// 返回空数组
const emptyArray = stubArray();
console.log(emptyArray); // => []

// 在数组方法中作为默认值使用
const items = [1, 2, 3];
const result = items.filter(x => x > 5) || stubArray();
console.log(result); // => []

// 在函数式编程中使用
const getData = () => stubArray();
const data = getData();
data.push('item'); // 新数组，所以安全
```

每次返回新的数组实例。

```typescript
import { stubArray } from 'es-toolkit/compat';

const arr1 = stubArray();
const arr2 = stubArray();

console.log(arr1 === arr2); // => false (不同实例)
console.log(Array.isArray(arr1)); // => true
console.log(arr1.length); // => 0
```

#### 参数

无参数。

#### 返回值

(`any[]`): 返回新的空数组。
