# orderBy

根据给定的 `criteria` 和对应的排序方向对一个对象数组进行排序。

- 如果提供的是键，它会根据这些键的值对对象进行排序。
- 如果提供的是函数，它会根据这些函数返回的值进行排序。

该函数返回按相应排序方向排列的对象数组。 如果两个对象在当前条件下具有相同的值，它将使用下一个条件来确定它们的顺序。

如果排序方向的数量少于条件的数量，则对剩余的条件使用最后一个排序方向。

## 签名

```typescript
function orderBy<T extends object>(
  arr: T[],
  criteria: Array<((item: T) => unknown) | keyof T>,
  orders: Array<'asc' | 'desc'>
): T[];
```

### 参数

- `arr` (`T[]`): 要排序的对象数组。
- `criteria` (`Array<keyof T | ((item: T) => unknown)>`): 排序的条件。其可以是对象键的数组或返回用于排序的值的函数。
- `orders` (`Array<'asc' | 'desc'>)`): 排序方向数组（'asc' 表示升序，'desc' 表示降序）。

### 返回值

(`T[]`) 排序后的数组。

## 示例

```typescript
// 按 `user` 以升序和 `age` 以降序对对象数组进行排序。
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

const result = orderBy(users, [obj => obj.user, 'age'], ['asc', 'desc']);
// result 将会是:
// [
//   { user: 'barney', age: 36 },
//   { user: 'barney', age: 34 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 },
// ]
```
