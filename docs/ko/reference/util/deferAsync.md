# deferAsync

스코프를 벗어날 때 비동기 콜백을 실행하는 `AsyncDisposable` 객체를 만들어요.

```typescript
await using cleanup = deferAsync(callback);
```

## 사용법

### `deferAsync(callback)`

스코프가 끝날 때 비동기 정리 코드를 자동으로 실행하고 싶을 때 `deferAsync`를 사용하세요. 반환된 객체를 [`await using` 선언](https://github.com/tc39/proposal-explicit-resource-management)으로 선언하면, 에러로 스코프를 벗어나는 경우에도 블록이 끝날 때 콜백이 실행되고 완료될 때까지 기다려요.

```typescript
import { deferAsync } from 'es-toolkit/util';

async function main() {
  const connection = await connect();
  await using cleanup = deferAsync(async () => {
    await connection.close();
  });

  // 이 함수가 반환되거나 에러를 던지면 연결이 자동으로 닫혀요.
  await connection.query('SELECT 1');
}
```

`await using` 선언을 사용하려면 TypeScript 5.2 이상과 Explicit Resource Management를 지원하는 런타임(Node.js 24 이상, 최신 브라우저)이 필요해요. 오래된 환경에서는 문법을 트랜스파일하고 `Symbol.asyncDispose` 폴리필을 추가하면 사용할 수 있어요.

::: info 동기 정리에는 defer를 사용하세요

이 함수는 콜백을 기다리기 때문에 async 함수 안에서만 사용할 수 있어요. 정리 코드가 동기라면, [`defer`](./defer.md) 함수를 `using`과 함께 사용하세요.

:::

#### 파라미터

- `callback` (`() => void | PromiseLike<void>`): 객체가 정리될 때 실행할 정리 함수예요. 반환한 값이 완료될 때까지 기다려요.

#### 반환 값

(`AsyncDisposable`): 정리될 때 `callback`을 실행하고 완료를 기다리는 객체를 반환해요.
