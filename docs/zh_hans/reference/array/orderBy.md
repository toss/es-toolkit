# orderBy

根据多个属性和它们对应的排序方向对对象数组进行排序。

此函数接受一个对象数组，一个要排序的属性键数组，以及一个排序方向数组。

它返回排序后的数组，根据每个键及其对应的方向（'asc' 表示升序，'desc' 表示降序）进行排序。

如果一个键的值相等，则继续比较下一个键以确定顺序。

## 签名

```typescript
function orderBy<T>(collection: T[], keys: Array<keyof T>, orders: Order[]): T[];
```

### 参数

- `collection` (`T[]`): 要排序的对象数组。
- `keys` (`Array<keyof T>`): 用于排序的键（属性）数组。
- `orders` (`Order[]`): 排序方向数组（'asc' 表示升序，'desc' 表示降序）。

### 返回值

(`T[]`) 排序后的数组。

## 示例

```typescript
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

const result = orderBy(users, ['user', 'age'], ['asc', 'desc']);
// result 将会是:
// [
//   { user: 'barney', age: 36 },
//   { user: 'barney', age: 34 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 },
// ]
```
