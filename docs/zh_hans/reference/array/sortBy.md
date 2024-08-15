# sortBy

根据给定的 `criteria` 对对象数组进行排序。

- 如果提供的是键，它将根据这些键的值对对象进行排序。
- 如果提供的是函数，它将根据这些函数返回的值进行排序。

该函数返回按升序排列的对象数组。如果两个对象在当前标准下具有相同的值，它将使用下一个标准来确定它们的顺序。

## 签名

```typescript
function sortBy<T extends object>(arr: T[], criteria: Array<keyof T | ((item: T) => unknown)>): T[];
```

### 参数

- `arr` (`T[]`): 要排序的对象数组。
- `criteria` (`Array<keyof T | ((item: T) => unknown)>`): 排序标准。可以是对象键的数组或返回用于排序的值的函数数组。

### 返回值

(`T[]`): 按升序排序的对象数组。

## 示例

```typescript
const users = [
  { user: 'foo', age: 24 },
  { user: 'bar', age: 7 },
  { user: 'foo ', age: 8 },
  { user: 'bar ', age: 29 },
];

sortBy(users, ['user', 'age']);
sortBy(users, [obj => obj.user, obj => obj.age]);
// results will be:
// [
//   { user : 'bar', age: 7 },
//   { user : 'bar', age: 29 },
//   { user : 'foo', age: 8 },
//   { user : 'foo', age: 24 },
// ]
```
