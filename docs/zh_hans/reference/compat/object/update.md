# update

::: info
此函数仅在 `es-toolkit/compat` 中可用，原因是出于兼容性考虑。它要么有替代的原生 JavaScript API，要么尚未完全优化。

从 `es-toolkit/compat` 导入时，此函数的行为与 lodash 完全相同，并提供相同的功能。
:::

使用更新函数更新给定对象中指定路径的值。如果路径的任何部分不存在，将会创建它。

## 签名

```typescript
function update<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  updater: (value: unknown) => unknown
): T;
```

### 参数

- `obj` (`T`): 要修改的对象。
- `path` (`PropertyKey | readonly PropertyKey[]`): 要更新的属性路径。
- `updater` (`(value: unknown) => unknown`): 生成更新值的函数。

### 返回值

(`T`): 修改后的对象。

## 示例

```typescript
import { update } from 'es-toolkit/compat/object/update';

const object = { a: [{ b: { c: 3 } }] };

// 使用更新函数更新值
update(object, 'a[0].b.c', n => (n as number) * 2);
// => { a: [{ b: { c: 6 } }] }

// 如果路径不存在则创建值
update({}, 'a.b[0]', () => 'c');
// => { a: { b: ['c'] } }
```

```

</rewritten_file>
```
