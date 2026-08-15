# cloneWith (Lodash 兼容性)

::: warning 建议实现自定义逻辑

这个 `cloneWith` 函数由于复杂的自定义函数处理而相对较慢。

请改用 `clone` 并直接实现自定义逻辑。

:::

使用自定义函数创建对象的浅拷贝。

```typescript
const cloned = cloneWith(value, customizer);
```

## 用法

### `cloneWith(value, customizer?)`

当您想要自定义复制工作方式时,请使用 `cloneWith`。自定义函数控制特定值的复制方式。

```typescript
import { cloneWith } from 'es-toolkit/compat';

// 基本用法(没有自定义函数)
const obj = { a: 1, b: 'hello' };
const cloned = cloneWith(obj);
// Returns: { a: 1, b: 'hello' } (新的对象实例)

// 转换数字值
const obj2 = { a: 1, b: 2, c: 'text' };
const cloned2 = cloneWith(obj2, value => {
  const obj = {};
  for (const key in value) {
    const val = value[key];
    if (typeof val === 'number') {
      obj[key] = val * 2;
    } else {
      obj[key] = val;
    }
  }
  return obj;
});
// Returns: { a: 2, b: 4, c: 'text' }

// 转换数组元素
const arr = [1, 2, 3];
const clonedArr = cloneWith(arr, value => {
  return value.map(x => x + 10);
});
// Returns: [11, 12, 13]

// 处理特定类型
const complex = {
  date: new Date('2023-01-01'),
  number: 42,
  text: 'hello',
};
const clonedComplex = cloneWith(complex, value => {
  const obj = {};
  for (const key in value) {
    const val = value[key];
    if (val instanceof Date) {
      obj[key] = val.toISOString();
    } else if (typeof val === 'string') {
      obj[key] = val.toUpperCase();
    } else {
      obj[key] = val;
    }
  }
  return obj;
});
// Returns: { date: '2023-01-01T00:00:00.000Z', number: 42, text: 'HELLO' }
```

如果自定义函数返回 `undefined`,则使用默认的复制行为。

```typescript
import { cloneWith } from 'es-toolkit/compat';

const obj = { a: 1, b: { c: 2 } };
const cloned = cloneWith(obj, value => {
  // 对所有值返回undefined = 使用默认复制
  return undefined;
});
// Returns: { a: 1, b: { c: 2 } } (与clone相同的结果)
```

#### 参数

- `value` (`T`): 要复制的值。
- `customizer` (`function`, 可选): 决定复制方式的函数。格式为 `(value: any) => any`。

#### 返回值

(`T`): 返回由自定义函数处理的浅拷贝。
