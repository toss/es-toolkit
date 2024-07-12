# omit

创建一个省略指定键的新对象。

该函数接受一个对象和一个键数组，返回一个新对象，该对象排除了与指定键对应的属性。

## 签名

```typescript
function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
```

### 参数

- `obj` (`T`): 要从中省略键的对象。
- `keys` (`K[]`): 要从对象中省略的键的数组。

### 返回值

(`Omit<T, K>`): 一个省略了指定键的新对象。

## 示例

```typescript
const obj = { a: 1, b: 2, c: 3 };
const result = omit(obj, ['b', 'c']);
// result 将会是 { a: 1 }
```
