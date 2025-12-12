# AbortError

중단되거나 취소된 작업을 나타내는 에러 클래스예요.

```typescript
const error = new AbortError(message);
```

## 사용법

### `new AbortError(message?)`

작업이 중단되거나 취소되었을 때 사용하는 에러 클래스예요. [debounce](../function/debounce.md)나 [delay](../promise/delay.md)와 같은 작업이 `AbortSignal`로 취소되었을 때 던져져요.

```typescript
import { AbortError } from 'es-toolkit/error';

// 기본 메시지로 에러를 생성해요.
throw new AbortError();
// 에러 메시지: 'The operation was aborted'

// 사용자 정의 메시지로 에러를 생성해요.
throw new AbortError('파일 업로드가 취소되었어요');
// 에러 메시지: '파일 업로드가 취소되었어요'
```

AbortSignal과 함께 사용하는 예시예요.

```typescript
import { AbortError, delay } from 'es-toolkit';

async function fetchData(signal: AbortSignal) {
  try {
    await delay(1000, { signal });
    return '데이터 로드 완료';
  } catch (error) {
    if (error instanceof AbortError) {
      console.log('작업이 취소되었어요');
    }
    throw error;
  }
}

const controller = new AbortController();
controller.abort(); // 작업 취소
await fetchData(controller.signal); // AbortError 발생
```

#### 파라미터

- `message` (`string`, 선택): 에러 메시지예요. 기본값은 `'The operation was aborted'`예요.

#### 반환 값

(`AbortError`): 중단된 작업을 나타내는 에러 인스턴스를 반환해요. `Error`를 상속받았으며, `name` 속성은 `'AbortError'`예요.
