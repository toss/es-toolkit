# merge

将源对象深度合并到目标对象中并修改目标对象。

```typescript
const result = merge(target, source);
```

## 用法

### `merge(target, source)`

当您想要深度合并两个对象时,请使用 `merge`。嵌套的对象和数组也会递归合并。与 [toMerged](./toMerged.md) 不同,它会修改原始 `target` 对象。

```typescript
import { merge } from 'es-toolkit/object';

// 基本对象合并
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
// result 和 target 都是 { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }

// 数组也会被合并
const arrayTarget = { a: [1, 2], b: { x: 1 } };
const arraySource = { a: [3], b: { y: 2 } };
merge(arrayTarget, arraySource);
// arrayTarget 是 { a: [3, 2], b: { x: 1, y: 2 } }

// null 值也会被适当处理
const nullTarget = { a: null };
const nullSource = { a: [1, 2, 3] };
merge(nullTarget, nullSource);
// nullTarget 是 { a: [1, 2, 3] }
```

`undefined` 值不会覆盖现有值。

```typescript
const target = { a: 1, b: 2 };
const source = { b: undefined, c: 3 };
merge(target, source);
// target 是 { a: 1, b: 2, c: 3 } (b 未被覆盖)
```

#### 参数

- `target` (`T extends Record<PropertyKey, any>`): 要合并源对象的目标对象。此对象会被修改。
- `source` (`S extends Record<PropertyKey, any>`): 要合并到目标对象的源对象。

#### 返回值

(`T & S`): 返回已合并源对象的目标对象。

## 示例

```typescript
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
console.log(result);
// 返回值: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }

const target = { a: [1, 2], b: { x: 1 } };
const source = { a: [3], b: { y: 2 } };
const result = merge(target, source);
console.log(result);
// 返回值: { a: [3, 2], b: { x: 1, y: 2 } }

const target = { a: null };
const source = { a: [1, 2, 3] };
const result = merge(target, source);
console.log(result);
// 返回值: { a: [1, 2, 3] }
```

## 演示

::: sandpack

```ts index.ts
import { merge } from 'es-toolkit';

const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
console.log(result);
```

:::

## 性能对比

|                   | [包大小](../../bundle-size.md) | [性能](../../performance.md) |
| ----------------- | ------------------------------ | ---------------------------- |
| es-toolkit        | 271 字节 (小 97.8%)            | 1,952,436 次 (快 3.65×)      |
| es-toolkit/compat | 4,381 字节 (小 64.9%)          | 706,558 次 (快 1.32×)        |
| lodash-es         | 12,483 字节                    | 533,484 次                   |
