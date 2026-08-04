# SingleFlight

동시에 요청된 비동기 작업을 하나만 실행하고, 중복 요청에는 실행 중인 작업의 Promise를 공유해요.

```typescript
const flight = new SingleFlight();
```

## 사용법

### `SingleFlight()`

여러 호출자가 같은 작업을 동시에 시작할 수 있지만 실제 실행은 한 번만 해야 할 때 `SingleFlight`를 사용해요.

```typescript
import { SingleFlight } from 'es-toolkit';

const flight = new SingleFlight();

const first = flight.run(async () => {
  const response = await fetch('/api/config');
  return response.json();
});

const second = flight.run(async () => {
  const response = await fetch('/api/config');
  return response.json();
});

console.log(first === second); // true
```

작업이 성공하거나 실패해도 같은 Promise를 공유해요. 작업이 끝나면 결과를 캐시하지 않으므로 다음 호출은 새로운 작업을 시작해요.

#### 메서드

- `run` (`(task: () => Promise<T>) => Promise<T>`): 작업을 실행하거나 이미 실행 중인 작업의 Promise를 반환해요.
