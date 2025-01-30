# pullAllBy

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

在通过提供的函数映射元素后，从数组中移除所有指定的值。
你可以使用以下几种方式来映射元素：

- **函数**: 在比较元素之前，使用给定函数映射每个元素。函数会对每个元素执行，并使用返回值进行比较。
- **属性名**: 使用指定属性的值来比较元素。
- **部分对象**: 根据两个元素是否都匹配给定部分对象的所有属性和值来比较。
- **属性-值对**: 根据两个元素是否都匹配指定的属性和值来比较。

此函数会直接修改 `arr`。
如果你想在不修改原始数组的情况下移除值，请使用 [differenceBy](../../array/differenceBy.md)。

## 签名

```typescript
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: (value: T) => unknown): T[];
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: Partial<T>): T[];
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: [keyof T, unknown]): T[];
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: keyof T): T[];
```

### 参数

- `arr` (`T[]`): 要修改的数组。
- `valuesToRemove` (`ArrayLike<T>`): 要从数组中移除的值。
- `getValue`:
  - **函数** (`(value: T) => unknown`): 在比较元素之前，使用给定函数映射每个元素。函数会对每个元素执行，并使用返回值进行比较。
  - **属性名** (`keyof T`): 使用指定属性的值来比较元素。
  - **部分对象** (`Partial<T>`): 根据两个元素是否都匹配给定部分对象的所有属性和值来比较。
  - **属性-值对** (`[keyof T, unknown]`): 根据两个元素是否都匹配指定的属性和值来比较。

### 返回值

(`T[]`): 移除指定值后的修改数组。

## 示例

```typescript
// Using a iteratee function
const items = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 1 }];
const result = pullAllBy(items, [{ value: 1 }, { value: 3 }], obj => obj.value);
console.log(result); // [{ value: 2 }]

// Using a property name
const items = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 1 }];
const result = pullAllBy(items, [{ value: 1 }, { value: 3 }], 'value');
console.log(result); // [{ value: 2 }]
```
