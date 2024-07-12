# pickBy

创建一个新对象，该对象由满足条件的属性组成。

该函数接受一个对象和一个谓词函数，并返回一个新对象，该对象仅包含谓词函数返回 `true` 的属性。

## 签名

```typescript
function pickBy<T extends Record<string, any>>(
  obj: T,
  shouldPick: (value: T[keyof T], key: keyof T) => boolean
): Partial<T>;
```

### 参数

- `obj` (`T`): 要从中挑选属性的对象。
- `shouldPick` (`(value: T[keyof T], key: keyof T) => boolean`): 一个谓词函数，确定是否应挑选属性。
  它以属性的键和值作为参数，返回 `true` 表示应挑选该属性，返回 `false` 表示不应挑选。

### 返回值

(`Partial<T>`): 一个由满足条件的属性组成的新对象。

## 示例

```typescript
const obj = { a: 1, b: 'pick', c: 3 };
const shouldPick = (value, key) => typeof value === 'string';
const result = pickBy(obj, shouldPick);
// result 将会是 { b: 'pick' }
```
