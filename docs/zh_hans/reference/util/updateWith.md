# updateWith (Lodash 兼容性)

::: warning 请使用直接赋值

此 `updateWith` 函数由于复杂的路径解析和自定义处理而运行缓慢。

请改用更快、更现代的直接属性赋值或可选链。

:::

使用更新函数修改对象指定路径上的值，同时使用自定义函数控制路径创建。

```typescript
const updated = updateWith(object, path, updater, customizer);
```

## 签名

```typescript
function updateWith<T extends object>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  updater: (oldValue: any) => any,
  customizer?: (value: any, key: string, object: T) => any
): T;
```

### 参数

- `obj` (`T`): 要修改的对象。
- `path` (`PropertyKey | readonly PropertyKey[]`): 要更新的属性路径。
- `updater` (`(oldValue: any) => any`): 生成更新值的函数。
- `customizer` (`(value: any, key: string, object: T) => any`, 可选): 自定义更新过程的函数。

#### 返回值

(`T`): 修改后的对象。

## 示例

```typescript
import { updateWith } from 'es-toolkit/compat';

const object = {};

// 使用自定义函数创建自定义路径结构
updateWith(object, '[0][1]', () => 'a', Object);
// => { '0': { '1': 'a' } }

// 自定义路径创建
updateWith(
  object,
  '[0][2]',
  () => 'b',
  value => {
    if (typeof value === 'number') {
      return [];
    }
  }
);
// => { '0': { '1': 'a', '2': 'b' } }
```
