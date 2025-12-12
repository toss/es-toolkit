# timeout

지정된 시간 후에 `TimeoutError`를 발생시키는 `Promise`를 반환해요.

```typescript
await timeout(ms);
```

## 사용법

### `timeout(ms)`

특정 시간이 지난 후 타임아웃 에러를 발생시키고 싶을 때 `timeout`을 사용하세요. 다른 Promise와 `Promise.race()`를 함께 사용해서 작업에 시간 제한을 걸 때 유용해요.

```typescript
import { timeout } from 'es-toolkit/promise';

// 기본 사용 - 1초 후 TimeoutError 발생
try {
  await timeout(1000);
  console.log('이 코드는 실행되지 않아요');
} catch (error) {
  console.log('타임아웃 에러 발생:', error.message); // 'The operation was timed out'
}
```

`Promise.race()`와 함께 사용해서 작업에 시간 제한을 걸 수 있어요:

```typescript
async function fetchWithTimeout(url: string) {
  try {
    const result = await Promise.race([
      fetch(url),
      timeout(5000), // 5초 제한
    ]);
    return result;
  } catch (error) {
    if (error.name === 'TimeoutError') {
      console.log('요청이 너무 오래 걸립니다');
    }
    throw error;
  }
}
```

여러 비동기 작업 중 하나라도 정해진 시간 안에 완료되지 않으면 전체 작업을 실패시키고 싶을 때도 사용할 수 있어요.

```typescript
async function multipleOperationsWithTimeout() {
  try {
    await Promise.race([
      Promise.all([fetch('/api/data1'), fetch('/api/data2'), fetch('/api/data3')]),
      timeout(3000), // 전체 작업에 3초 제한
    ]);
    console.log('모든 작업이 제시간에 완료되었습니다');
  } catch (error) {
    console.log('작업이 제시간에 완료되지 못했습니다');
  }
}
```

#### 파라미터

- `ms` (`number`): `TimeoutError`가 발생하기까지의 밀리초 단위 시간이에요.

#### 반환 값

(`Promise<never>`): 지정된 시간 후에 `TimeoutError`로 거부되는 Promise를 반환해요.

#### 에러

지정된 시간이 지나면 `TimeoutError`를 던져요.
