# groupBy

将数组的元素根据提供的键生成函数或属性键进行分组。

该函数接受一个数组和一个从每个元素生成键的函数或属性键字符串。它返回一个对象，其中键是生成的键或属性键，值是具有相同键的元素数组。

## 签名

```typescript
function groupBy<T, K extends PropertyKey>(arr: readonly T[], keyOrFn: ((item: T) => K) | keyof T): Record<K, T[]>;
```

### 参数

- `arr` (`readonly T[]`): 要分组的数组。
- `keyOrFn` (`((item: T) => K) | keyof T`): 从元素生成键的函数或用于分组的属性键。

### 返回值

(`Record<K, T[]>`) 一个对象，其中每个键关联一个具有共享该键的元素数组。

## 示例

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];

// 使用键生成函数：
const result1 = groupBy(array, item => item.category);

// 使用属性键：
const result2 = groupBy(array, 'category');

// 两种方式得到相同的结果：
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
