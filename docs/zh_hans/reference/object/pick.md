# pick

创建一个由指定属性组成的新对象。

该函数接受一个对象和一个键数组，并返回一个新对象，该对象仅包含与指定键对应的属性。

## 签名

```typescript
function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
```

### 参数

- `obj` (`T`): 要提取属性的对象。
- `keys` (`K[]`): 要从对象中提取的键数组。

### 返回值

(`Pick<T, K>`): 一个包含了指定键的新对象。

## 示例

```typescript
const obj = { a: 1, b: 2, c: 3 };
const result = pick(obj, ['a', 'c']);
// result 将会是 { a: 1, c: 3 }
```

## 与 Lodash 的兼容性

`es-toolkit/compat` 中的 `pick` 函数可以处理深路径选择。

```typescript
import { pick } from 'es-toolkit/compat';

const obj = { a: { b: { c: 1 } }, d: { e: 2 }, f: { g: 3 }, 'f.g': 4 };
const result = pick(obj, ['a.b.c', 'f.g']);
// result will be { a: { b: { c: 1 } }, 'f.g': 4 }
```
