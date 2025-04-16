# toCamelCaseKeys

创建一个新对象，将对象的属性转换为[驼峰命名法](../string/camelCase.md)（`camelCase`）。

嵌套对象中的所有属性也会被转换为驼峰命名法。

## 签名

```typescript
function toCamelCaseKeys<T>(obj: T): ToCamelCaseKeys<T>;
```

### 参数

- `obj` (`T`): 要转换键的对象。

### 返回值

(`ToCamelCaseKeys<T>`): 一个新对象，其中所有键均转换为camelCase格式。

## 示例

```typescript
// Example with objects
const obj = { user_id: 1, first_name: 'John' };
const result = toCamelCaseKeys(obj);
// result will be { userId: 1, firstName: 'John' }

// Example with arrays of objects
const arr = [
  { user_id: 1, first_name: 'John' },
  { user_id: 2, first_name: 'Jane' },
];
const arrResult = toCamelCaseKeys(arr);
// arrResult will be [{ userId: 1, firstName: 'John' }, { userId: 2, firstName: 'Jane' }]

// Example with nested objects
const nested = {
  user_data: {
    user_id: 1,
    user_address: {
      street_name: 'Main St',
      zip_code: '12345',
    },
  },
};
const nestedResult = toCamelCaseKeys(nested);
// nestedResult will be:
// {
//   userData: {
//     userId: 1,
//     userAddress: {
//       streetName: 'Main St',
//       zipCode: '12345'
//     }
//   }
// }
```
