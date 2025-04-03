# assignInWith

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

将 `source` 对象的属性值分配给 `object`。它还包括从原型链继承的属性。您可以提供 `getValueToAssign` 函数来决定每个属性应该分配什么值。

在 `source` 和 `object` 中具有相同值的属性将不会被覆盖。

您可以使用 `getValueToAssign` 函数来决定要分配给 `object` 的值。函数返回的值将被分配。如果未提供该函数，则默认使用 `identity` 函数。

## 签名

```typescript
function assignInWith<O, S>(object: O, source: S, getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S) => any): O & S;
function assignInWith<O, S1, S2>(object: O, source1: S1, source2: S2, getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S1 | S2) => any): O & S1 & S2;
function assignInWith<O, S1, S2, S3>(object: O, source1: S1, source2: S2, source3: S3, getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S1 | S2 | S3) => any): O & S1 & S2 & S3;
function assignInWith<O, S1, S2, S3, S4>(object: O, source1: S1, source2: S2, source3: S3, source4: S4, getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S1 | S2 | S3 | S4) => any): O & S1 & S2 & S3 & S4;
function assignInWith(object: any, ...sources: any[]): any;
```


### 参数

- `object` (`any`): 将要分配属性的目标对象。
- `sources` (`...any[]`): 其属性将被分配到目标对象的源对象。
- `getValueToAssign` (`(objValue: any, srcValue: any, key: string, object: O, source: S) => any)`): 用于确定每个属性应分配什么值的函数。该函数返回的值将被分配给相应的属性。

### 返回值

(`any`): 更新后的目标对象，其中包含源对象分配的属性。

## 示例

```typescript
const target = { a: 1 };
const result = assignInWith(target, { b: 2 }, { c: 3 }, function(objValue, srcValue) {
  return objValue === undefined ? srcValue : objValue;
});
console.log(result); // Output: { a: 1, b: 2, c: 3 }
```