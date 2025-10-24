# withTimeout

비동기 함수에 시간 제한을 걸어서, 지정된 시간 내에 완료되지 않으면 `TimeoutError`를 발생시켜요.

```typescript
await withTimeout(run, ms);
```

## 레퍼런스

### `withTimeout(run, ms)`

비동기 작업에 타임아웃을 설정하고 싶을 때 `withTimeout`을 사용하세요. Promise가 지정된 시간 내에 완료되지 않으면 `TimeoutError`로 거부되어서, 무한정 기다리는 상황을 방지할 수 있어요.

```typescript
import { withTimeout } from 'es-toolkit/promise';

async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  return response.json();
}

try {
  // 1초 내에 완료되어야 해요
  const data = await withTimeout(fetchData, 1000);
  console.log('데이터를 받았어요:', data);
} catch (error) {
  if (error.name === 'TimeoutError') {
    console.log('요청 시간이 초과되었어요');
  }
}
```

데이터베이스 쿼리에 시간 제한을 걸고 싶을 때도 사용할 수 있어요.

```typescript
async function queryDatabase(query: string) {
  // 데이터베이스 쿼리 로직
  return await db.execute(query);
}

try {
  const result = await withTimeout(
    () => queryDatabase('SELECT * FROM users'),
    5000 // 5초 제한
  );
  console.log('쿼리 결과:', result);
} catch (error) {
  console.log('쿼리가 너무 오래 걸려서 취소되었어요');
}
```

여러 API 호출 중에서 가장 빠른 응답만 받고 싶은 경우에도 활용할 수 있어요.

```typescript
async function getFastestResponse() {
  const apis = [() => fetch('/api/server1'), () => fetch('/api/server2'), () => fetch('/api/server3')];

  try {
    // 각 API에 2초 제한을 걸고 가장 빨리 응답하는 것만 받아요
    const promises = apis.map(api => withTimeout(api, 2000));
    const result = await Promise.race(promises);
    return result.json();
  } catch (error) {
    console.log('모든 API가 시간 초과되었어요');
  }
}
```

#### 파라미터

- `run` (`() => Promise<T>`): 실행할 비동기 함수예요.
- `ms` (`number`): 타임아웃이 발생하기까지의 밀리초 단위 시간이에요.

#### 반환 값

(`Promise<T>`): 주어진 비동기 함수가 반환하는 결과이거나, 시간 초과 시 TimeoutError로 거부되는 Promise를 반환해요.

#### 에러

지정된 시간 내에 완료되지 않으면 `TimeoutError`를 던져요.
