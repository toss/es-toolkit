# setWith (Lodash 兼容性)

::: warning 请使用直接赋值

此 `setWith` 函数内部调用 `updateWith` 函数,由于复杂的路径处理和自定义函数逻辑而运行缓慢。

请使用更快、更现代的直接赋值或解构赋值。

:::

在指定路径设置值,同时通过自定义函数控制对象的创建方式。

```typescript
const result = setWith(obj, path, value, customizer);
```

## 用法

### `setWith(object, path, value, customizer)`

当您想在对象的特定路径设置值,同时使用自定义函数控制中间对象的类型时,请使用 `setWith`。如果自定义函数返回 `undefined`,则使用默认逻辑(数组索引使用数组,否则使用对象)。

```typescript
import { setWith } from 'es-toolkit/compat';

// 基本用法(无自定义函数)
const obj1 = {};
setWith(obj1, 'a.b.c', 4);
console.log(obj1);
// 结果: { a: { b: { c: 4 } } }

// 强制创建数组的自定义函数
const obj2 = {};
setWith(obj2, '[0][1]', 'value', () => []);
console.log(obj2);
// 结果: { '0': [undefined, 'value'] }

// 仅在特定条件下自定义
const obj3 = {};
setWith(obj3, 'a[0].b.c', 'nested', (value, key) => {
  // 仅对数字键(数组索引)返回空对象
  return typeof key === 'string' && /^\d+$/.test(key) ? {} : undefined;
});
console.log(obj3);
// 结果: { a: { '0': { b: { c: 'nested' } } } }

// 使用 Object 构造函数作为自定义函数
const obj4 = {};
setWith(obj4, 'x[0].y', 42, Object);
console.log(obj4);
// 结果: { x: { '0': { y: 42 } } }

// 复杂的自定义函数逻辑
const obj5 = {};
setWith(obj5, 'data.items[0].props.config', 'value', (value, key, object) => {
  console.log('Creating:', key, 'in', object);

  // 对特定键使用 Map
  if (key === 'props') {
    return new Map();
  }

  // 对数字键使用数组
  if (typeof key === 'string' && /^\d+$/.test(key)) {
    return [];
  }

  // 默认使用普通对象
  return {};
});

// 使用 WeakMap 作为中间对象
const obj6 = {};
setWith(obj6, 'cache.user.profile', 'data', (value, key) => {
  if (key === 'cache') {
    return new WeakMap();
  }
  return undefined; // 使用默认行为
});
```

自定义函数接收三个参数。

```typescript
import { setWith } from 'es-toolkit/compat';

const obj = {};
setWith(obj, 'a.b[0].c', 'value', (nsValue, key, nsObject) => {
  console.log('nsValue:', nsValue); // 当前值(通常为 undefined)
  console.log('key:', key); // 要创建的键
  console.log('nsObject:', nsObject); // 父对象

  // 根据特定条件返回不同的对象类型
  return key === 'b' ? [] : {};
});
```

#### 参数

- `object` (`T`): 要设置值的对象。
- `path` (`PropertyPath`): 要设置的属性路径。
- `value` (`any`): 要设置的值。
- `customizer` (`(nsValue: any, key: string, nsObject: T) => any`, 可选): 自定义中间对象创建的函数。

#### 返回值

(`T | R`): 返回修改后的对象。
