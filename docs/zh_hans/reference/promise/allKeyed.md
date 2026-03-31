# allKeyed

并发解析一个 Promise 对象，返回一个具有相同键和解析值的对象。

类似于 `Promise.all`，但接受一个 Promise 对象而不是数组，在结果中保留键。这样可以通过名称而不是位置索引来解构解析后的值。

基于 [TC39 `Promise.allKeyed` 提案](https://github.com/tc39/proposal-await-dictionary)。

## 签名

```typescript
function allKeyed<T extends Record<string, unknown>>(
  tasks: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }>;
```

### 参数

- `tasks` (`T`): 一个对象，其值为要并发解析的 Promise（或普通值）。

### 返回值

(`Promise<{ [K in keyof T]: Awaited<T[K]> }>`): 返回一个 Promise，解析为具有相同键和解析值的对象。

## 示例

```typescript
import { allKeyed } from 'es-toolkit/promise';

const { user, posts } = await allKeyed({
  user: fetchUser(),
  posts: fetchPosts(),
});

// 也支持普通值
const result = await allKeyed({
  a: Promise.resolve(1),
  b: 2,
});
// { a: 1, b: 2 }
```
