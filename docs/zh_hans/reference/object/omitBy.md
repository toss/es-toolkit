# omitBy

创建一个新对象，该对象由不满足条件的属性组成。

该函数接受一个对象和一个谓词函数，并返回一个新对象，该对象仅包含条件函数返回 `false` 的属性。

## 签名

```typescript
function omitBy<T extends Record<string, any>>(
  obj: T,
  shouldOmit: (value: T[keyof T], key: keyof T) => boolean
): Partial<T>;
```

### 参数

- `obj` (`T`): 要从中省略属性的对象。
- `shouldOmit` (`(value: T[keyof T], key: keyof T) => boolean`): 一个谓词函数，确定是否应省略属性。
  它以属性的键和值作为参数，返回 `true` 表示应省略该属性，返回 `false` 表示不应省略。

### 返回值

(`Partial<T>`): 一个由不满足条件的属性组成的新对象。

## 示例

```typescript
const obj = { a: 1, b: 'omit', c: 3 };
const shouldOmit = (value, key) => typeof value === 'string';
const result = omitBy(obj, shouldOmit);
// result 将会是 { a: 1, c: 3 }
```
