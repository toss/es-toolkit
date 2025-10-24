# updateWith (Lodash 兼容性)

::: warning 请使用直接赋值

此 `updateWith` 函数由于复杂的路径解析和自定义函数处理而运行缓慢。

请使用更快、更现代的直接属性赋值或可选链。

:::

使用更新函数更新对象指定路径的值,同时使用自定义函数控制路径创建。

```typescript
const updated = updateWith(obj, path, updater, customizer);
```

## 参考

### `updateWith(obj, path, updater, customizer?)`

与 `update` 类似，但可以使用自定义函数控制路径不存在时创建的中间对象的形状。

```typescript
import { updateWith } from 'es-toolkit/compat';

// 基本行为（与 update 相同）
const object = { a: [{ b: { c: 3 } }] };
updateWith(object, 'a[0].b.c', n => n * n);
// => { a: [{ b: { c: 9 } }] }

// 使用数组路径更新
updateWith(object, ['a', 0, 'b', 'c'], n => n + 10);
// => { a: [{ b: { c: 13 } }] }
```

可以使用自定义函数控制创建的中间对象的形状。

```typescript
import { updateWith } from 'es-toolkit/compat';

const object = {};

// 使用 Object 构造函数作为自定义函数（创建对象而不是数组）
updateWith(object, '[0][1]', () => 'a', Object);
// => { '0': { '1': 'a' } }
// （默认行为是 { '0': ['a'] }）
```

自定义函数接收要创建的值、键和对象作为参数。

```typescript
import { updateWith } from 'es-toolkit/compat';

const customizer = (value: any, key: string, object: any) => {
  // 对于数字键创建对象而不是数组
  if (!isNaN(Number(key))) {
    return {};
  }
};

const result = {};
updateWith(result, '[0][1]', () => 'value', customizer);
// => { '0': { '1': 'value' } }
```

如果路径已存在，则不会调用自定义函数。

```typescript
import { updateWith } from 'es-toolkit/compat';

const object = { a: { b: 1 } };
updateWith(
  object,
  'a.b',
  n => n * 2,
  () => {
    console.log('Not called'); // 不会被调用
    return {};
  }
);
// => { a: { b: 2 } }
```

#### 参数

- `obj` (`T`): 要修改的对象。
- `path` (`PropertyKey | readonly PropertyKey[]`): 要更新的属性路径。可以指定为字符串或数组。
- `updater` (`(oldValue: any) => any`): 接收现有值并返回新值的函数。
- `customizer` (`(value: any, key: string, object: T) => any`, 可选): 路径不存在时返回要创建的中间对象的函数。返回 `undefined` 以使用默认行为。

#### 返回值

(`T`): 返回修改后的对象。
