# mergeWith

将源对象的属性合并到目标对象中。

您可以提供自定义的 `merge` 函数来控制属性的合并方式。`merge` 函数会在每个属性被合并时调用，并接收以下参数：

- `targetValue`：目标对象中属性的当前值。
- `sourceValue`：源对象中属性的值。
- `key`：被合并的属性的键。
- `target`：目标对象。
- `source`：源对象。

`merge` 函数应返回要在目标对象中设置的值。如果返回 `undefined`，则会对数组和对象应用默认的深度合并：

- 如果源对象中的属性是数组或对象，而目标对象中对应的属性也是数组或对象，它们将被合并。
- 如果源对象中的属性是 `undefined`，它不会覆盖目标对象中已定义的属性。

有关默认深度合并的详细信息，请参见 [merge](./merge.md)。

此函数会修改目标对象。

## 签名

```typescript
function mergeWith<T, S>(
  target: T,
  source: S,
  merge: (targetValue: any, sourceValue: any, key: string, target: T, source: S) => any
): T & S;
```

### 参数

- `target` (`T`): 目标对象，源对象的属性将合并到此对象中。该对象会被就地修改。
- `source` (`S`): 源对象，其属性将合并到目标对象中。
- `merge` (`(targetValue: any, sourceValue: any, key: string, target: T, source: S) => any`): 自定义合并函数，用于定义属性如何组合。它接收以下参数：
  - `targetValue`: 目标对象中属性的当前值。
  - `sourceValue`: 源对象中属性的值。
  - `key`: 被合并的属性的键。
  - `target`: 目标对象。
  - `source`: 源对象。

### 返回值

(`T & S`): 合并了源对象属性的更新后的目标对象。

## 示例

```typescript
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

mergeWith(target, source, (targetValue, sourceValue) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue;
  }
});
// 返回 { a: 1, b: 5, c: 4 }

const target = { a: [1], b: [2] };
const source = { a: [3], b: [4] };

const result = mergeWith(target, source, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});

// 返回 { a: [1, 3], b: [2, 4] })
```

## 演示

::: sandpack

```typescript
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
