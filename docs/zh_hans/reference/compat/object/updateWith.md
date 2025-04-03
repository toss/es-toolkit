# updateWith

::: info
此函数仅在 `es-toolkit/compat` 中可用，原因是出于兼容性考虑。它要么有替代的原生 JavaScript API，要么尚未完全优化。

从 `es-toolkit/compat` 导入时，此函数的行为与 lodash 完全相同，并提供相同的功能。
:::

使用更新函数和定制器函数更新给定对象中指定路径的值。如果路径的任何部分不存在，将根据定制器函数创建它。

## 签名

```typescript
function updateWith<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  updater: (value: unknown) => unknown,
  customizer: (value: unknown) => unknown
): T;
```

### 参数

- `obj` (`T`): 要修改的对象。
- `path` (`PropertyKey | readonly PropertyKey[]`): 要更新的属性路径。
- `updater` (`(value: unknown) => unknown`): 生成更新值的函数。
- `customizer` (`(value: unknown) => unknown`): 定制更新过程的函数。

### 返回值

(`T`): 修改后的对象。

## 示例

```typescript
import { updateWith } from 'es-toolkit/compat/object/updateWith';

const object = { a: [{ b: { c: 3 } }] };

// 使用定制器函数创建自定义路径结构
updateWith(object, '[0].a.b.c', n => (n as number) + 1, customizer);
// => { '0': { a: { b: { c: 4 } } }, a: [{ b: { c: 3 } }] }

function customizer(value: unknown) {
  if (value == null) {
    return {};
  }
  return value;
}
```
