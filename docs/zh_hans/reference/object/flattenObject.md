# flattenObject

将嵌套对象扁平化为具有点分隔键的单级对象。

- `Array` 会被扁平化。
- 非普通对象，如 `Buffer` 或 `TypedArray`，不会被扁平化。

## 签名

```typescript
function flattenObject(object: object, { delimiter = '.' }: FlattenObjectOptions = {}): Record<string, any>;
```

### 参数

- `object` (`object`): 要扁平化的对象。
- `delimiter` (`string`): 嵌套键之间的分隔符。默认为 `'.'`。

### 返回值

(`T`): 扁平化后的对象。

## 示例

```typescript
const nestedObject = {
  a: {
    b: {
      c: 1,
    },
  },
  d: [2, 3],
};

const flattened = flattenObject(nestedObject);
console.log(flattened);
// 输出:
// {
//   'a.b.c': 1,
//   'd.0': 2,
//   'd.1': 3
// }
```

```typescript
const flattened = flattenObject(nestedObject, { delimiter: '/' });
console.log(flattened);
// 输出:
// {
//   'a/b/c': 1,
//   'd/0': 2,
//   'd/1': 3
// }
```
