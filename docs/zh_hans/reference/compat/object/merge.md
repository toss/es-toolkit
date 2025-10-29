# merge (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `merge`

这个 `merge` 函数由于内部调用复杂的 `mergeWith` 函数而相对较慢。

请改用更快、更现代的 `es-toolkit` 的 [`merge`](../../object/merge.ts)。

:::

深度合并多个对象为单个对象。

```typescript
const result = merge(target, ...sources);
```

## 参考

### `merge(object, ...sources)`

将一个或多个源对象深度合并到目标对象中。嵌套的对象和数组会递归合并。如果源对象的属性是 `undefined`,则不会覆盖目标对象中的现有值。适用于合并对象配置或应用默认值。

```typescript
import { merge } from 'es-toolkit/compat';

// 基本对象合并
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
// 结果: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }

// 数组合并
const obj1 = { arr: [1, 2] };
const obj2 = { arr: [3, 4] };
const merged = merge(obj1, obj2);
// 结果: { arr: [3, 4] } (数组被替换)

// 多个对象合并
const base = { a: 1 };
const ext1 = { b: 2 };
const ext2 = { c: 3 };
const ext3 = { d: 4 };
const combined = merge(base, ext1, ext2, ext3);
// 结果: { a: 1, b: 2, c: 3, d: 4 }

// 嵌套对象合并
const config = {
  api: { url: 'https://api.example.com', timeout: 5000 },
  features: { auth: true },
};
const overrides = {
  api: { timeout: 10000, retries: 3 },
  features: { analytics: true },
};
const finalConfig = merge(config, overrides);
// 结果: {
//   api: { url: 'https://api.example.com', timeout: 10000, retries: 3 },
//   features: { auth: true, analytics: true }
// }
```

目标对象会被修改,因此如需保留原始对象请使用空对象。

```typescript
import { merge } from 'es-toolkit/compat';

const original = { a: 1, b: { x: 1 } };
const source = { b: { y: 2 } };

// 保留原始对象
const result = merge({}, original, source);
// original 未被修改
```

#### 参数

- `object` (`any`): 要合并到的目标对象。此对象会被修改。
- `...sources` (`any[]`): 要合并的源对象。

#### 返回值

(`any`): 返回合并后的目标对象。
