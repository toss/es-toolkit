# assign

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

将多个 `source` 对象的属性分配给 `object` 对象。

如果 `source` 对象中的属性与 `object` 对象中对应属性的值相等，则不会被覆盖。

## 签名

```typescript
function assign<O, S>(object: O, source: S): O & S;
function assign<O, S1, S2>(object: O, source1: S1, source2: S2): O & S1 & S2;
function assign<O, S1, S2, S3>(object: O, source1: S1, source2: S2, source3: S3): O & S1 & S2 & S3;
function assign<O, S1, S2, S3, S4>(
  object: O,
  source1: S1,
  source2: S2,
  source3: S3,
  source4: S4
): O & S1 & S2 & S3 & S4;
function assign(object: any, ...sources: any[]): any;
```

### 参数

- `object` (`any`): 将属性分配给目标对象。
- `sources` (`...any[]`): 其属性将分配给目标对象的源对象。

### 返回值

(`any`): 分配了源对象属性的更新目标对象。

## 示例

```typescript
const target = { a: 1 };
const result = assign(target, { b: 2 }, { c: 3 });
console.log(result); // Output: { a: 1, b: 2, c: 3 }
```
