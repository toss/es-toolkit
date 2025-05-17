# findLastKey

::: info
此函数仅可从 `es-toolkit/compat` 导入。  
它是为兼容 lodash 而提供的，不属于 `es-toolkit` 的核心部分。
:::

返回对象中**最后一个满足条件的元素的键**。

它的行为类似于 `findKey`，但搜索顺序是从对象末尾开始的。

## 签名

```ts
function findLastKey<T extends Record<any, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;

function findLastKey<T extends Record<any, any>>(obj: T, objectToFind: Partial<T[keyof T]>): keyof T | undefined;

function findLastKey<T extends Record<any, any>>(obj: T, propertyToFind: [keyof T[keyof T], any]): keyof T | undefined;

function findLastKey<T extends Record<any, any>>(obj: T, propertyToFind: keyof T[keyof T]): keyof T | undefined;
```

### 参数

- `obj` (`T`): 要遍历的对象。
- `predicate`: 用于判断的条件。支持以下几种形式：
  - **函数**：`(value, key, obj) => boolean`
  - **部分对象**：例如 `{ active: true }`
  - **属性-值对**：例如 `['active', true]`
  - **属性名（判断是否为 truthy）**：例如 `'active'`

### 返回值

返回满足条件的最后一个元素的键。  
如果没有匹配的元素，则返回 `undefined`。

## 示例

```ts
import { findLastKey } from 'es-toolkit/compat';

const users = {
  barney: { age: 36, active: true },
  fred: { age: 40, active: false },
  pebbles: { age: 1, active: true },
};

// 使用函数
findLastKey(users, o => o.age < 40);
// => 'pebbles'

// 使用部分对象
findLastKey(users, { active: true });
// => 'pebbles'

// 使用属性-值对
findLastKey(users, ['active', false]);
// => 'fred'

// 使用属性名
findLastKey(users, 'active');
// => 'pebbles'
```
