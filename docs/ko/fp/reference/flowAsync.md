# flowAsync (함수형 프로그래밍)

왼쪽에서 오른쪽으로 함수를 비동기로 합성해서, 매 중간 결과를 기다리는 재사용 가능한 비동기 함수를 반환해요.

```typescript
const fn = flowAsync(...functions);
const result = await fn(...args);
```

::: info

`flowAsync`는 [`flow`](./flow.md)의 Promise 인식 버전이에요. `flow`는 각 함수의 반환값을 그대로 다음 함수에 넘기기 때문에, 어떤 함수가 `Promise`를 반환하면 `await`되지 않은 상태로 다음 함수에 전달돼요. `flowAsync`는 매 단계를 기다려서, 동기 함수와 비동기 함수를 한 체인에서 자유롭게 섞어 쓸 수 있어요.

:::

## 사용법

`flowAsync`는 여러 함수를 받아서 왼쪽에서 오른쪽으로 하나의 비동기 함수로 합성해요. 첫 번째 함수는 인자를 몇 개든 받을 수 있고, 그 뒤의 함수들은 모두 인자를 하나 받아서 이전 함수의 결과를 기다린 값을 넘겨받아요. 합성된 함수는 항상 `Promise`를 반환해요.

```typescript
import { flowAsync } from 'es-toolkit/fp';

const fetchUser = async (id: number) => ({ id, name: 'Alice' });
const getName = (user: { name: string }) => user.name;

const getUserName = flowAsync(fetchUser, getName);

await getUserName(1); // => 'Alice'
```

동기 함수와 비동기 함수를 어떤 순서로든 섞을 수 있어요. 각 결과는 다음 함수로 넘어가기 전에 기다려져요.

```typescript
import { flowAsync } from 'es-toolkit/fp';

const process = flowAsync(
  (x: number) => x + 1,
  async x => x * 3,
  x => `value: ${x}`
);

await process(1); // => 'value: 6'
```

어떤 함수든 에러를 던지거나 거부된 `Promise`를 반환하면, 합성된 함수도 그 에러로 거부돼요. 호출부를 `try`/`catch`(또는 `.catch`) 하나로 감싸면 모든 단계의 실패를 처리할 수 있어요.

```typescript
import { flowAsync } from 'es-toolkit/fp';

const risky = flowAsync(
  async (id: number) => {
    throw new Error(`user ${id} not found`);
  },
  (user: { name: string }) => user.name
);

await risky(1); // Error: user 1 not found 로 거부돼요.
```

#### 파라미터

- `functions` (`Array<(...args: any[]) => any>`): 왼쪽에서 오른쪽으로 합성할 함수들이에요. 첫 번째 함수는 인자를 몇 개든 받을 수 있고, 나머지는 모두 인자를 하나 받아서 이전 함수의 출력을 기다린 값을 넘겨받아요.

#### 반환 값

(`(...args: any[]) => Promise<unknown>`): 모든 함수를 순서대로 적용하면서 각 결과를 기다리는 새로운 비동기 함수예요. 첫 번째 함수와 같은 파라미터를 받아서 마지막 함수의 결과를 기다린 값으로 해결돼요. 공개된 오버로드는 체인에서 정확한 타입을 추론해요.
