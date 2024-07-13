# keyBy

映射数组中的每个元素，基于提供的生成键的函数。

该函数接受一个数组和一个生成键的函数，返回一个对象，其中键是生成的键，值是对应的元素。

如果有多个元素生成相同的键，则最后一个元素将作为该键的值。

## 签名

```typescript
function keyBy<T, K extends PropertyKey>(arr: readonly T[], getKeyFromItem: (item: T) => K): Record<K, T>;
```

### 参数

- `arr` (`T[]`): 要映射的元素数组。
- `getKeyFromItem` (`(item: T) => K`): 从元素生成键的函数。

### 返回值

(`Record<K, T>`) 一个对象，其中键映射到数组中的每个元素。

## 示例

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];
const result = keyBy(array, item => item.category);
// result 将会是:
// {
//   fruit: { category: 'fruit', name: 'banana' },
//   vegetable: { category: 'vegetable', name: 'carrot' }
// }
```
