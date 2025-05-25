# toSnakeCaseKeys

创建一个新对象，将对象的属性转换为[蛇形命名法](../string/snakeCase.md)（`snake_case`）。

嵌套对象中的所有属性也会被转换为蛇形命名法。

## 签名

```typescript
function toSnakeCaseKeys<T>(obj: T): ToSnakeCaseKeys<T>;
```

### 参数

- `obj` (`T`): 要转换键的对象。

### 返回值

(`ToSnakeCaseKeys<T>`): 一个新的对象，其中所有键均转换为 snake_case。

## 示例

```typescript
// Example with objects
const obj = { userId: 1, firstName: 'John' };
const result = toSnakeCaseKeys(obj);
// result will be { user_id: 1, first_name: 'John' }

// Example with arrays of objects
const arr = [
  { userId: 1, firstName: 'John' },
  { userId: 2, firstName: 'Jane' },
];
const arrResult = toSnakeCaseKeys(arr);
// arrResult will be [{ user_id: 1, first_name: 'John' }, { user_id: 2, first_name: 'Jane' }]

// Example with nested objects
const nested = {
  userData: {
    userId: 1,
    userAddress: {
      streetName: 'Main St',
      zipCode: '12345',
    },
  },
};
const nestedResult = toSnakeCaseKeys(nested);
// nestedResult will be:
// {
//   user_data: {
//     user_id: 1,
//     user_address: {
//       street_name: 'Main St',
//       zip_code: '12345'
//     }
//   }
// }
```
