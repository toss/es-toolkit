# update (Lodash 兼容性)

::: warning 请使用直接赋值

此 `update` 函数由于复杂的路径解析和嵌套对象创建逻辑而运行缓慢。

请使用更快、更现代的直接属性赋值或可选链。

:::

使用更新函数更新对象指定路径的值。

```typescript
const updated = update(obj, path, updater);
```

## 参考

### `update(obj, path, updater)`

当您想要使用函数转换嵌套对象中特定路径的值时，使用 `update`。如果路径不存在，将自动创建。

```typescript
import { update } from 'es-toolkit/compat';

// 转换嵌套属性值
const object = { a: [{ b: { c: 3 } }] };
update(object, 'a[0].b.c', n => (n as number) * 2);
// => { a: [{ b: { c: 6 } }] }

// 使用数组路径更新
update(object, ['a', 0, 'b', 'c'], n => (n as number) + 10);
// => { a: [{ b: { c: 13 } }] }
```

如果路径不存在，将自动创建必要的嵌套结构。

```typescript
import { update } from 'es-toolkit/compat';

// 在空对象中创建嵌套结构
update({}, 'a.b.c', () => 'hello');
// => { a: { b: { c: 'hello' } } }

// 数组也会自动创建
update({}, 'a.b[0]', () => 'value');
// => { a: { b: ['value'] } }
```

可以基于现有值计算新值。

```typescript
import { update } from 'es-toolkit/compat';

const stats = { score: 100 };
update(stats, 'score', score => score * 1.1); // 增加 10%
// => { score: 110 }
```

#### 参数

- `obj` (`object`): 要修改的对象。
- `path` (`PropertyKey | PropertyKey[]`): 要更新的属性路径。可以指定为字符串或数组。
- `updater` (`(value: any) => any`): 接收现有值并返回新值的函数。

#### 返回值

(`any`): 返回修改后的对象。
