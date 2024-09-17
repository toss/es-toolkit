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

## 与 Lodash 的兼容性

`es-toolkit/compat` 中的 `omit` 函数可以省略深层路径的属性。

```typescript
import { omit } from 'es-toolkit/compat';

const obj = { a: { b: { c: 1 } }, d: { e: 2 }, f: { g: 3 }, 'f.g': 4 };
const result = omit(obj, ['a.b.c', 'f.g']);
// result will be { a: { b: {} }, d: { e: 2 }, f: { g: 3 } }
```
