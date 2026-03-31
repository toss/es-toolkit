# allKeyed

Promise 객체를 동시에 실행하고, 같은 키와 해결된 값을 가진 객체를 반환해요.

`Promise.all`과 비슷하지만, 배열 대신 객체의 Promise를 받아서 결과에서 키를 유지해요. 위치 인덱스에 의존하지 않고 이름으로 해결된 값을 구조 분해할 수 있어요.

[TC39 `Promise.allKeyed` 제안](https://github.com/tc39/proposal-await-dictionary)에 기반해요.

## 인터페이스

```typescript
function allKeyed<T extends Record<string, unknown>>(
  tasks: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }>;
```

### 파라미터

- `tasks` (`T`): 동시에 실행할 Promise(또는 일반 값)를 값으로 가진 객체예요.

### 반환 값

(`Promise<{ [K in keyof T]: Awaited<T[K]> }>`): 같은 키와 해결된 값을 가진 객체로 해결되는 Promise를 반환해요.

## 예시

```typescript
import { allKeyed } from 'es-toolkit/promise';

const { user, posts } = await allKeyed({
  user: fetchUser(),
  posts: fetchPosts(),
});

// 일반 값도 지원해요
const result = await allKeyed({
  a: Promise.resolve(1),
  b: 2,
});
// { a: 1, b: 2 }
```
