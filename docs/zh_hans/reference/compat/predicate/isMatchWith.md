# isMatchWith

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

使用给定的比较函数对 `target` 和 `source` 进行深度比较以确定它们是否匹配。比较函数可以用来精细控制匹配逻辑。

该函数会递归遍历两个值，对每个属性-值对调用自定义比较函数。如果比较函数返回布尔值，则直接使用该结果；如果返回 `undefined`，则使用 [isMatch](./isMatch.md) 中的默认比较函数。

不同数据类型的比较方式如下：

- **对象**: 当 `source` 的所有属性都存在于 `target` 中且匹配时返回 `true`
- **数组**: 当 `source` 数组的所有元素都能在 `target` 数组中找到时返回 `true`（与顺序无关）
- **Map**: 当 `source` Map 中的所有键值对都存在于 `target` Map 中且匹配时返回 `true`
- **Set**: 当 `source` Set 中的所有元素都能在 `target` Set 中找到时返回 `true`
- **函数**: 使用严格相等（`===`）比较，如果函数有属性则按对象方式比较
- **原始值**: 使用严格相等（`===`）比较

特殊情况：

- 当 `source` 是空对象、空数组、空 Map 或空 Set 时，对任何 `target` 都返回 `true`
- 使用内部栈处理循环引用对象以防止无限递归

## 签名

```typescript
function isMatchWith(
  target: unknown,
  source: unknown,
  compare?: (objValue: any, srcValue: any, key: PropertyKey, object: any, source: any, stack?: Map<any, any>) => unknown
): boolean;
```

### 参数

- `target` (`unknown`): 要检查匹配的值
- `source` (`unknown`): 要匹配的模式/模板
- `compare` (`function`, 可选): 可选的自定义比较函数。接收以下参数:
  - `objValue`: 当前路径的 target 值
  - `srcValue`: 当前路径的 source 值
  - `key`: 正在比较的属性键或数组索引
  - `object`: target 的父对象/数组
  - `source`: source 的父对象/数组
  - `stack`: 用于检测循环引用的内部 Map
    匹配时返回 `true`，不匹配时返回 `false`，要继续使用默认行为时返回 `undefined`

### 返回值

(`boolean`): 如果对象匹配则返回 `true`，否则返回 `false`。

## 示例

### 基本比较（不使用比较函数）

```typescript
// Basic matching without custom comparator
isMatchWith({ a: 1, b: 2 }, { a: 1 }); // true
isMatchWith([1, 2, 3], [1, 3]); // true
```

### 不区分大小写的字符串比较

```typescript
const caseInsensitiveCompare = (objVal, srcVal) => {
  if (typeof objVal === 'string' && typeof srcVal === 'string') {
    return objVal.toLowerCase() === srcVal.toLowerCase();
  }
  return undefined; // Use default behavior for non-strings
};

isMatchWith({ name: 'JOHN', age: 30 }, { name: 'john' }, caseInsensitiveCompare); // true
```

### 使用自定义比较函数进行数值范围比较

```typescript
// Custom comparison for range matching
const rangeCompare = (objVal, srcVal, key) => {
  if (key === 'age' && typeof srcVal === 'object' && srcVal.min !== undefined) {
    return objVal >= srcVal.min && objVal <= srcVal.max;
  }
  return undefined;
};

isMatchWith({ name: 'John', age: 25 }, { age: { min: 18, max: 30 } }, rangeCompare); // true
```
