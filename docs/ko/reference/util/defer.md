# defer

스코프를 벗어날 때 콜백을 실행하는 `Disposable` 객체를 만들어요.

```typescript
using cleanup = defer(callback);
```

## 사용법

### `defer(callback)`

스코프가 끝날 때 정리 코드를 자동으로 실행하고 싶을 때 `defer`를 사용하세요. 반환된 객체를 [`using` 선언](https://github.com/tc39/proposal-explicit-resource-management)으로 선언하면, 에러로 스코프를 벗어나는 경우에도 블록이 끝날 때 콜백이 실행돼요.

```typescript
import { defer } from 'es-toolkit/util';

function processFile() {
  const file = openFile('data.txt');
  using cleanup = defer(() => file.close());

  // 이 함수가 반환되거나 에러를 던지면 파일이 자동으로 닫혀요.
  return file.read();
}
```

같은 스코프에 여러 개의 `using` 선언이 있으면, 콜백은 스택처럼 선언의 역순으로 실행돼요.

```typescript
import { defer } from 'es-toolkit/util';

function run() {
  using first = defer(() => console.log('first'));
  using second = defer(() => console.log('second'));
  console.log('body');
}

run();
// 'body', 'second', 'first' 순서로 출력돼요.
```

`using` 선언을 사용하려면 TypeScript 5.2 이상과 Explicit Resource Management를 지원하는 런타임(Node.js 24 이상, 최신 브라우저)이 필요해요. 오래된 환경에서는 문법을 트랜스파일하고 `Symbol.dispose` 폴리필을 추가하면 사용할 수 있어요.

::: info 비동기 정리에는 deferAsync를 사용하세요

이 함수는 콜백을 동기적으로 실행해요. 정리 코드가 비동기이고 기다려야 한다면, [`deferAsync`](./deferAsync.md) 함수를 `await using`과 함께 사용하세요.

:::

#### 파라미터

- `callback` (`() => void`): 객체가 정리될 때 실행할 정리 함수예요.

#### 반환 값

(`Disposable`): 정리될 때 `callback`을 실행하는 객체를 반환해요.
