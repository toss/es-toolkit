# groupBy

将数组的元素根据提供的键生成函数进行分组。

该函数接受一个数组和一个从每个元素生成键的函数。它返回一个对象，其中键是生成的键，值是具有相同键的元素数组。

## 签名

```typescript
function groupBy<T, K extends PropertyKey>(arr: T[], getKeyFromItem: (item: T) => K): Record<K, T[]>;
```

### 参数

- `arr` (`T[]`): 要分组的数组。
- `getKeyFromItem` (`(item: T) => K`): 从元素生成键的函数。

### 返回值

(`Record<K, T[]>`) 一个对象，其中每个键关联一个具有共享该键的元素数组。

## 示例

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];
const result = groupBy(array, item => item.category);
// 结果将是:
// {
//   fruit: [
//     { category: 'fruit', name: 'apple' },
//     { category: 'fruit', name: 'banana' }
//   ],
//   vegetable: [
//     { category: 'vegetable', name: 'carrot' }
//   ]
// }
```
