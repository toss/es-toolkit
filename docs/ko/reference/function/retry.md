# retry

Promise를 반환하는 함수가 성공할 때까지 반복해서 실행해요.

```typescript
const result = await retry(asyncFunc, options);
```

## 레퍼런스

### `retry(func, options?)`

비동기 함수가 실패했을 때 자동으로 재시도하고 싶을 때 `retry`를 사용하세요. API 호출이나 네트워크 요청처럼 일시적으로 실패할 수 있는 작업에 유용해요.

재시도 횟수, 재시도 간격, 취소 시그널을 설정할 수 있어요. 재시도 간격은 고정값이거나 재시도 횟수에 따라 동적으로 계산하는 함수를 사용할 수 있어요.

```typescript
import { retry } from 'es-toolkit/function';

// 기본 사용법 (무한 재시도)
const data1 = await retry(async () => {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
});

// 재시도 횟수 제한
const data2 = await retry(async () => {
  return await fetchData();
}, 3);

// 재시도 간격 설정 (100ms)
const data3 = await retry(
  async () => {
    return await fetchData();
  },
  {
    retries: 3,
    delay: 100,
  }
);

// 동적 재시도 간격 (지수 백오프)
const data4 = await retry(
  async () => {
    return await fetchData();
  },
  {
    retries: 5,
    delay: attempts => Math.min(100 * Math.pow(2, attempts), 5000),
  }
);
```

AbortSignal을 사용해서 재시도를 취소할 수도 있어요.

```typescript
import { retry } from 'es-toolkit/function';

const controller = new AbortController();

// 5초 후 재시도 취소
setTimeout(() => controller.abort(), 5000);

try {
  const data = await retry(
    async () => {
      return await fetchData();
    },
    {
      retries: 10,
      delay: 1000,
      signal: controller.signal,
    }
  );
  console.log(data);
} catch (error) {
  console.log('재시도가 취소되거나 실패했습니다:', error);
}
```

#### 파라미터

- `func` (`() => Promise<T>`): 재시도할 비동기 함수예요.
- `options` (`number | RetryOptions`, 선택): 재시도 횟수나 옵션 객체예요.
  - `retries` (`number`, 선택): 재시도할 횟수예요. 기본값은 `Infinity`로 무한 재시도해요.
  - `delay` (`number | (attempts: number) => number`, 선택): 재시도 간격(밀리초)이에요. 숫자나 함수를 사용할 수 있어요. 기본값은 `0`이에요.
  - `signal` (`AbortSignal`, 선택): 재시도를 취소할 수 있는 시그널이에요.

#### 반환 값

(`Promise<T>`): 함수가 성공적으로 실행된 결과값을 반환해요.

#### 에러

재시도 횟수가 초과되거나 AbortSignal로 취소되면 마지막 에러를 던져요.
