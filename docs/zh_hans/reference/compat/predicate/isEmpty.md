# isEmpty

检查给定的值是否为空。

- 如果给定的值是字符串，检查它是否为空字符串。
- 如果给定的值是数组、`Map` 或 `Set`，检查其大小是否为 0。
- 如果给定的值是[类数组对象](../compat/predicate/isArrayLike.md)，检查其长度是否为 0。
- 如果给定的值是对象，检查它是否是没有属性的空对象。
- 原始值（字符串、布尔值、数字或 bigints）被视为空。

## 签名

```typescript
function isEmpty(): true;
function isEmpty(value: string): value is '';
function isEmpty(value: Map<any, any>): boolean;
function isEmpty(value: Set<any>): boolean;
function isEmpty(value: Array<any>): value is [];
function isEmpty<T extends Record<any, any>>(
  value: T | null | undefined
): value is Record<keyof T, never> | null | undefined;
function isEmpty(value: unknown): boolean;
```

### 参数

- `value` (`unknown`): 要检查的值。

### 返回值

(`boolean`): 如果值为空则为`true`，否则为`false`。

## 示例

```typescript
isEmpty(); // true
isEmpty(null); // true
isEmpty(''); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty(new Map()); // true
isEmpty(new Set()); // true
isEmpty('hello'); // false
isEmpty([1, 2, 3]); // false
isEmpty({ a: 1 }); // false
isEmpty(new Map([['key', 'value']])); // false
isEmpty(new Set([1, 2, 3])); // false
```
