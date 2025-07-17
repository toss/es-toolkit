# findKey

查找对象中满足所提供的测试函数的第一个元素的键。

## 签名

```typescript
function findKey<T extends Record<any, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;
```

### 参数

- `obj` (`T extends Record<any, any>`): 要搜索的对象。
- `predicate` (`(value: T[keyof T], key: keyof T, obj: T) => boolean`): 对对象中的每个值执行的函数。

### 返回

(`keyof T | undefined`): 对象中满足所提供的测试功能的第一个元素的键，如果没有元素通过测试，则为未定义。

## 示例

```typescript
const users = {
  pebbles: { age: 24, active: true },
  barney: { age: 36, active: true },
  fred: { age: 40, active: false },
};

findKey(users, o => o.age < 40); // 'pebbles'
findKey(users, o => o.age > 50); // undefined
```

## Lodash 兼容性

从 `es-toolkit/compat` 导入 `findKey` 以实现与 lodash 的完全兼容。

您可以通过多种方式指定查找键的条件。

- **谓词函数**：对每个元素执行谓词函数。返回第一个返回 `true` 的元素的键。
- **部分对象**：返回与给定对象部分匹配的元素的键。
- **属性-值对**：返回具有指定属性和值匹配的元素的键。
- **属性名**：返回指定属性评估为真的元素的键。

### 签名

```typescript
function findKey<T>(obj: T, conditionToFind: (value: T[keyof T], key: string, obj: T) => boolean): string | undefined;
function findKey<T>(obj: T, objectToFind: Partial<T[keyof T]>): string | undefined;
function findKey<T>(obj: T, propertyToFind: [PropertyKey, any]): string | undefined;
function findKey<T>(obj: T, propertyToFind: PropertyKey): string | undefined;
function findKey<T>(
  obj: T | null | undefined,
  predicate?:
    | ((value: T[keyof T], key: string, obj: T) => unknown)
    | PropertyKey
    | [PropertyKey, any]
    | Partial<T[keyof T]>
): string | undefined;
```

### 示例

```typescript
const users = { barney: { age: 36 }, fred: { age: 40 } };

findKey(users, o => o.age < 40);
// => 'barney'
findKey(users, { age: 36 });
// => 'barney'
findKey(users, ['age', 36]);
// => 'barney'

const languages = { javascript: { active: false }, typescript: { active: true } };
findKey(users, 'active');
// => 'typescript'
```
