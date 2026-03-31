# allKeyed

并发解析一个 Promise 对象，返回一个具有相同键和解析值的对象。

```typescript
await allKeyed(tasks);
```

## 用法

### `allKeyed(tasks)`

当您想要并行运行多个 Promise 并通过名称而不是位置索引访问结果时，可以使用 `allKeyed`。它类似于 `Promise.all`，但接受一个 Promise 对象而不是数组，在结果中保留键。

基于 [TC39 `Promise.allKeyed` 提案](https://github.com/tc39/proposal-await-dictionary)。

```typescript
import { allKeyed } from 'es-toolkit/promise';

const { user, posts } = await allKeyed({
  user: fetchUser(),
  posts: fetchPosts(),
});
```

也支持与 Promise 一起使用普通值。

```typescript
const result = await allKeyed({
  a: Promise.resolve(1),
  b: 2,
});
// { a: 1, b: 2 }
```

当您想要并行获取多个资源而不必担心数组顺序时也很有用。

```typescript
// 使用 Promise.all 时，交换顺序会静默破坏解构：
// const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);

// 使用 allKeyed 时，键是显式的——没有顺序错误：
const { user, posts } = await allKeyed({
  user: fetchUser(),
  posts: fetchPosts(),
});
```

#### 参数

- `tasks` (`T`): 一个对象，其值为要并发解析的 Promise（或普通值）。

#### 返回值

(`Promise<{ [K in keyof T]: Awaited<T[K]> }>`): 返回一个 Promise，解析为具有相同键和解析值的对象。
