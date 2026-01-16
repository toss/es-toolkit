# toMerged

返回将源对象深度合并到目标对象副本的新对象。

```typescript
const result = toMerged(target, source);
```

## 用法

### `toMerged(target, source)`

当您想要深度合并两个对象但不想修改原始对象时,请使用 `toMerged`。与 [merge](./merge.md) 不同,它不会修改原始 `target` 对象,而是返回一个新对象。

```typescript
import { toMerged } from 'es-toolkit/object';

// 基本对象合并
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = toMerged(target, source);
// result 是 { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }
// target 保持为 { a: 1, b: { x: 1, y: 2 } }

// 数组也会被合并
const arrayTarget = { a: [1, 2], b: { x: 1 } };
const arraySource = { a: [3], b: { y: 2 } };
const arrayResult = toMerged(arrayTarget, arraySource);
// arrayResult 是 { a: [3, 2], b: { x: 1, y: 2 } }
// arrayTarget 未被修改

// null 值也会被适当处理
const nullTarget = { a: null };
const nullSource = { a: [1, 2, 3] };
const nullResult = toMerged(nullTarget, nullSource);
// nullResult 是 { a: [1, 2, 3] }
```

`undefined` 值不会覆盖现有值。

```typescript
const target = { a: 1, b: 2 };
const source = { b: undefined, c: 3 };
const result = toMerged(target, source);
// result 是 { a: 1, b: 2, c: 3 } (b 未被覆盖)
```

#### 参数

- `target` (`T extends Record<PropertyKey, any>`): 将被合并的目标对象。此对象不会被修改。
- `source` (`S extends Record<PropertyKey, any>`): 要合并到目标对象的源对象。

#### 返回值

(`MergeDeep<T, S>`): 返回目标对象和源对象合并后的新对象。

## 演示

::: sandpack

```ts index.ts
import { toMerged } from 'es-toolkit';

const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = toMerged(target, source);
console.log(result);
```

:::
