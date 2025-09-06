# update

::: info
此函数仅在 `es-toolkit/compat` 中可用，原因是出于兼容性考虑。它要么有替代的原生 JavaScript API，要么尚未完全优化。

从 `es-toolkit/compat` 导入时，此函数的行为与 lodash 完全相同，并提供相同的功能。
:::

使用更新函数更新指定对象路径上的值。如果路径的某部分不存在，则会创建它。

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
