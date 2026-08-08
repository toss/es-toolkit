# KeyedSingleFlight

각 key마다 비동기 작업을 하나만 실행하고, 같은 key의 중복 요청에는 실행 중인 작업의 Promise를 공유해요.

```typescript
const flight = new KeyedSingleFlight<string>();
```

## 사용법

### `KeyedSingleFlight<K>()`

key별로 작업을 중복 제거하고, 서로 다른 key의 작업은 동시에 실행해야 할 때 `KeyedSingleFlight`를 사용해요.

```typescript
import { KeyedSingleFlight } from 'es-toolkit';

const flight = new KeyedSingleFlight<string>();

const first = flight.run('user:1', async () => {
  const response = await fetch('/api/users/1');
  return response.json();
});

const second = flight.run('user:1', async () => {
  const response = await fetch('/api/users/1');
  return response.json();
});

const other = flight.run('user:2', async () => {
  const response = await fetch('/api/users/2');
  return response.json();
});

console.log(first === second); // true
console.log(first === other); // false
```

작업이 성공하거나 실패해도 같은 Promise를 공유해요. 작업이 끝나면 결과를 캐시하지 않으므로 같은 key의 다음 호출은 새로운 작업을 시작해요. key는 `Map`과 같은 방식으로 비교하므로 객체 key는 참조가 같을 때만 같은 key로 취급해요.

#### 파라미터

- `K` (`unknown`): 작업을 식별하는 key의 타입이에요.

#### 메서드

- `run` (`(key: K, task: () => Promise<T>) => Promise<T>`): 작업을 실행하거나 해당 key에서 이미 실행 중인 작업의 Promise를 반환해요.
