# TimeoutError

제한 시간이 지난 작업을 나타내는 에러 클래스예요.

```typescript
const error = new TimeoutError(message);
```

## 레퍼런스

### `new TimeoutError(message?)`

작업의 제한 시간이 지났을 때 사용하는 에러 클래스예요. [timeout](../promise/timeout.md)나 [withTimeout](../promise/withTimeout.md) 같은 작업의 제한 시간이 지났을 때 던져져요.

```typescript
import { TimeoutError } from 'es-toolkit/error';

// 기본 메시지로 에러를 생성해요.
throw new TimeoutError();
// 에러 메시지: 'The operation was timed out'

// 사용자 정의 메시지로 에러를 생성해요.
throw new TimeoutError('API 요청 시간이 초과되었어요');
// 에러 메시지: 'API 요청 시간이 초과되었어요'
```

제한 시간과 함께 사용하는 예시예요.

```typescript
import { timeout, TimeoutError } from 'es-toolkit';

async function fetchWithTimeout(url: string) {
  try {
    const response = await timeout(() => fetch(url), 3000);
    return response;
  } catch (error) {
    if (error instanceof TimeoutError) {
      console.log('요청 시간이 초과되었어요');
    }
    throw error;
  }
}

// 3초 이상 걸리면 TimeoutError 발생
await fetchWithTimeout('https://example.com/api/slow');
```

#### 파라미터

- `message` (`string`, 선택): 에러 메시지예요. 기본값은 `'The operation was timed out'`예요.

### 반환 값

(`TimeoutError`): 시간 초과된 작업을 나타내는 에러 인스턴스를 반환해요. `Error`를 상속받았으며, `name` 속성은 `'TimeoutError'`예요.
