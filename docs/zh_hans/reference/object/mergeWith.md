# mergeWith

使用自定义合并函数将源对象深度合并到目标对象中并修改目标对象。

```typescript
const result = mergeWith(target, source, mergeFunction);
```

## 参考

### `mergeWith(target, source, merge)`

当您想要合并两个对象并对每个属性应用自定义合并逻辑时,请使用 `mergeWith`。如果合并函数返回 `undefined`,则使用默认的深度合并逻辑。

```typescript
import { mergeWith } from 'es-toolkit/object';

// 将数字值相加合并
const target = { a: 1, b: 2, c: { x: 10 } };
const source = { b: 3, c: { x: 20, y: 30 }, d: 4 };

const result = mergeWith(target, source, (targetValue, sourceValue, key) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue; // 数字相加
  }
  // 返回 undefined 则使用默认合并逻辑
});
// result 和 target 都是 { a: 1, b: 5, c: { x: 30, y: 30 }, d: 4 }

// 连接数组合并
const arrayTarget = { items: [1, 2], metadata: { count: 2 } };
const arraySource = { items: [3, 4], metadata: { count: 2 } };

mergeWith(arrayTarget, arraySource, (targetValue, sourceValue) => {
  if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
    return targetValue.concat(sourceValue);
  }
});
// arrayTarget 是 { items: [1, 2, 3, 4], metadata: { count: 2 } }

// 根据键应用不同的合并逻辑
const config = { timeout: 1000, retries: 3, features: { featureA: true } };
const updates = { timeout: 2000, retries: 5, features: { featureB: false } };

mergeWith(config, updates, (targetValue, sourceValue, key) => {
  if (key === 'timeout') {
    return Math.max(targetValue, sourceValue); // timeout 选择较大值
  }
  if (key === 'retries') {
    return Math.min(targetValue, sourceValue); // retries 选择较小值
  }
  // 其他属性使用默认合并逻辑
});
// config 是 { timeout: 2000, retries: 3, features: { featureA: true, featureB: false } }
```

#### 参数

- `target` (`T extends Record<PropertyKey, any>`): 要合并源对象的目标对象。此对象会被修改。
- `source` (`S extends Record<PropertyKey, any>`): 要合并到目标对象的源对象。
- `merge` (`(targetValue: any, sourceValue: any, key: string, target: T, source: S) => any`): 自定义合并函数。
  - `targetValue`: 目标对象的当前值
  - `sourceValue`: 源对象的值
  - `key`: 正在合并的属性的键
  - `target`: 目标对象
  - `source`: 源对象

#### 返回值

(`T & S`): 返回已合并源对象的目标对象。

## 示例

```typescript
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

mergeWith(target, source, (targetValue, sourceValue) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue;
  }
});
// 返回值: { a: 1, b: 5, c: 4 }

const target = { a: [1], b: [2] };
const source = { a: [3], b: [4] };

const result = mergeWith(target, source, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// 返回值: { a: [1, 3], b: [2, 4] })
```

## 演示

::: sandpack

```ts index.ts
import { mergeWith } from 'es-toolkit';

const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const result = mergeWith(target, source, (targetValue, sourceValue) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue;
  }
});
console.log(result);
```

:::
