# update (Lodash 兼容性)

::: warning 请使用直接赋值

此 `update` 函数由于复杂的路径解析和嵌套对象创建逻辑而运行缓慢。

请使用更快、更现代的直接属性赋值或可选链。

:::

使用更新函数更新对象指定路径的值。

```typescript
const updated = update(object, path, updater);
```

## 签名

```typescript
function update(obj: object, path: PropertyKey | PropertyKey[], updater: (value: any) => any): any;
```

### 参数

- `obj` (`object`): 要修改的对象。
- `path` (`PropertyKey | PropertyKey[]`): 要更新的属性路径。
- `updater` (`(value: any) => any`): 生成更新值的函数。

### 返回值

(`any`): 修改后的对象。

## 示例

```typescript
import { update } from 'es-toolkit/compat';

const object = { a: [{ b: { c: 3 } }] };

// 使用更新函数更新值
update(object, 'a[0].b.c', n => (n as number) * 2);
// => { a: [{ b: { c: 6 } }] }

// 如果路径不存在则创建值
update({}, 'a.b[0]', () => 'c');
// => { a: { b: ['c'] } }
```
