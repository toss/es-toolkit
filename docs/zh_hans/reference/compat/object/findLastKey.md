# findLastKey

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

返回对象中满足指定条件的最后一个元素的键。

与从头开始搜索的 `findKey` 不同，`findLastKey` 从对象的末尾开始搜索。

## 签名

```typescript
function findLastKey<T>(
  obj: T | null | undefined,
  conditionToFind: (value: T[keyof T], key: string, obj: T) => unknown
): string | undefined;

function findLastKey<T>(obj: T | null | undefined, objectToFind: Partial<T[keyof T]>): string | undefined;

function findLastKey<T>(obj: T | null | undefined, propertyToFind: [PropertyKey, any]): string | undefined;

function findLastKey<T>(obj: T | null | undefined, propertyToFind: PropertyKey): string | undefined;

function findLastKey<T>(
  obj: T | null | undefined,
  predicate?:
    | ((value: T[keyof T], key: string, obj: T) => unknown)
    | PropertyKey
    | [PropertyKey, any]
    | Partial<T[keyof T]>
): string | undefined;
```

### 参数

- `obj` (`T | null | undefined`): 要检查的对象。
- `predicate`: 每次迭代调用的函数。可以是以下之一：
  - `(value, key, obj) => unknown` - 为每个元素执行的函数。
  - `Partial<T[keyof T]>` - 匹配具有相同属性的元素。
  - `[PropertyKey, any]` - 匹配具有指定属性和值的元素。
  - `PropertyKey` - 匹配指定属性为真值的元素。

### 返回

(`string | undefined`): 返回匹配元素的键，如果没有匹配的元素则返回 `undefined`。

### 示例

```typescript
import { findLastKey } from 'es-toolkit/compat';

const users = {
  barney: { age: 36, active: true },
  fred: { age: 40, active: false },
  pebbles: { age: 1, active: true },
};

// 使用函数谓词
findLastKey(users, o => o.age < 40);
// => 'pebbles'

// 使用部分对象
findLastKey(users, { active: true });
// => 'pebbles'

// 使用属性-值对
findLastKey(users, ['active', false]);
// => 'fred'

// 使用属性名（真值检查）
findLastKey(users, 'active');
// => 'pebbles'
```
