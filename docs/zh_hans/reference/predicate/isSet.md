# isSet

检查给定值是否为 `Set` 实例。

```typescript
const result = isSet(value);
```

## 用法

### `isSet(value)`

当您想检查值是否为 `Set` 实例时,请使用 `isSet`。在区分 `Set` 对象和其他对象时非常有用。

```typescript
import { isSet } from 'es-toolkit/predicate';

// Set 实例
const set1 = new Set();
const set2 = new Set([1, 2, 3]);
const set3 = new Set(['a', 'b', 'c']);

console.log(isSet(set1)); // true
console.log(isSet(set2)); // true
console.log(isSet(set3)); // true

// 非 Set 值
console.log(isSet(new Map())); // false
console.log(isSet(new WeakSet())); // false
console.log(isSet([])); // false
console.log(isSet({})); // false
console.log(isSet(null)); // false
console.log(isSet(undefined)); // false
```

在为 `Set`、`Array`、`Map` 等 JavaScript 内置对象执行不同逻辑时非常有用。

```typescript
// 计算集合大小
function getCollectionSize(collection: unknown): number {
  if (isSet(collection)) {
    // TypeScript 将 collection 推断为 Set<any>
    return collection.size;
  }

  if (Array.isArray(collection)) {
    return collection.length;
  }

  if (collection && typeof collection === 'object') {
    return Object.keys(collection).length;
  }

  return 0;
}

// 使用示例
console.log(getCollectionSize(new Set([1, 2, 3]))); // 3
console.log(getCollectionSize([1, 2, 3])); // 3
console.log(getCollectionSize({ a: 1, b: 2 })); // 2

// 去重工具
function removeDuplicates(data: unknown) {
  if (isSet(data)) {
    // 已经是 Set,直接返回
    return data;
  }

  if (Array.isArray(data)) {
    return new Set(data);
  }

  // 不转换其他类型
  return data;
}

const duplicatedArray = [1, 2, 2, 3, 3, 3];
const uniqueSet = removeDuplicates(duplicatedArray);
console.log(uniqueSet); // Set { 1, 2, 3 }

const existingSet = new Set(['a', 'b']);
console.log(removeDuplicates(existingSet)); // Set { 'a', 'b' } (返回相同的 Set)
```

也可以广泛用于 Set 操作和数据转换。

```typescript
// 通用集合合并
function mergeCollections(...collections: unknown[]): Set<any> {
  const result = new Set();

  for (const collection of collections) {
    if (isSet(collection)) {
      // 将 Set 的所有值添加到结果中
      for (const item of collection) {
        result.add(item);
      }
    } else if (Array.isArray(collection)) {
      // 添加数组的所有值
      for (const item of collection) {
        result.add(item);
      }
    }
  }

  return result;
}

// 使用示例
const set1 = new Set([1, 2, 3]);
const array1 = [3, 4, 5];
const set2 = new Set(['a', 'b']);

const merged = mergeCollections(set1, array1, set2);
console.log(merged); // Set { 1, 2, 3, 4, 5, 'a', 'b' }

// 计算集合交集
function getIntersection(coll1: unknown, coll2: unknown): Set<any> {
  const set1 = isSet(coll1) ? coll1 : new Set(Array.isArray(coll1) ? coll1 : []);
  const set2 = isSet(coll2) ? coll2 : new Set(Array.isArray(coll2) ? coll2 : []);

  const intersection = new Set();

  for (const item of set1) {
    if (set2.has(item)) {
      intersection.add(item);
    }
  }

  return intersection;
}

// 使用示例
const setA = new Set([1, 2, 3, 4]);
const arrayB = [3, 4, 5, 6];

const intersection = getIntersection(setA, arrayB);
console.log(intersection); // Set { 3, 4 }
```

#### 参数

- `value` (`unknown`): 要检查是否为 Set 实例的值。

#### 返回值

(`value is Set<any>`): 如果值是 Set 实例,则返回 `true`,否则返回 `false`。
