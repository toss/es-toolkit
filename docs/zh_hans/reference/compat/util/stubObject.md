# stubObject (Lodash 兼容性)

::: warning 直接使用 `{}`

这个 `stubObject` 函数是一个简单返回空对象的包装函数，是不必要的抽象。

改为使用更快、更直接的 `{}`。

:::
:::

始终返回新的空对象。

```typescript
const emptyObject = stubObject();
```

## 用法

### `stubObject()`

始终返回新空对象的函数。当需要空对象作为默认值或在函数式编程中需要一致的返回值时使用。

```typescript
import { stubObject } from 'es-toolkit/compat';

// 返回空对象
const emptyObject = stubObject();
console.log(emptyObject); // => {}

// 作为默认值使用
function processData(data = stubObject()) {
  return { ...data, processed: true };
}

console.log(processData()); // => { processed: true }
console.log(processData({ name: 'John' })); // => { name: 'John', processed: true }

// 在函数式编程中使用
const createEmpty = () => stubObject();
const obj = createEmpty();
obj.newProperty = 'value'; // 新对象，所以安全
```

每次返回新的对象实例。

```typescript
import { stubObject } from 'es-toolkit/compat';

const obj1 = stubObject();
const obj2 = stubObject();

console.log(obj1 === obj2); // => false (不同实例)
console.log(typeof obj1); // => 'object'
console.log(Object.keys(obj1).length); // => 0
```

#### 参数

无参数。

#### 返回值

(`any`): 返回新的空对象。
