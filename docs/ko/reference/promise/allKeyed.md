# allKeyed

Promise 객체를 동시에 실행하고, 같은 키와 해결된 값을 가진 객체를 반환해요.

```typescript
await allKeyed(tasks);
```

## 사용법

### `allKeyed(tasks)`

여러 Promise를 병렬로 실행하고, 위치 인덱스가 아닌 이름으로 결과에 접근하고 싶을 때 `allKeyed`를 사용하세요. `Promise.all`과 비슷하지만, 배열 대신 객체의 Promise를 받아서 결과에서 키를 유지해요.

[TC39 `Promise.allKeyed` 제안](https://github.com/tc39/proposal-await-dictionary)에 기반해요.

```typescript
import { allKeyed } from 'es-toolkit/promise';

const { user, posts } = await allKeyed({
  user: fetchUser(),
  posts: fetchPosts(),
});
```

Promise와 함께 일반 값도 지원해요.

```typescript
const result = await allKeyed({
  a: Promise.resolve(1),
  b: 2,
});
// { a: 1, b: 2 }
```

배열 순서를 신경 쓰지 않고 여러 리소스를 병렬로 가져올 때도 유용해요.

```typescript
// Promise.all은 순서가 바뀌면 구조 분해가 조용히 깨져요:
// const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);

// allKeyed는 키가 명시적이라 순서 버그가 없어요:
const { user, posts } = await allKeyed({
  user: fetchUser(),
  posts: fetchPosts(),
});
```

#### 파라미터

- `tasks` (`T`): 동시에 실행할 Promise(또는 일반 값)를 값으로 가진 객체예요.

#### 반환 값

(`Promise<{ [K in keyof T]: Awaited<T[K]> }>`): 같은 키와 해결된 값을 가진 객체로 해결되는 Promise를 반환해요.
