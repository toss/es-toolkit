# retry

`Promise`를 반환하는 함수가 성공할 때까지 다시 시도해요. 재시도 횟수와 재시도 사이 간격을 설정할 수 있어요.

## 인터페이스

```typescript
function retry<T>(func: () => Promise<T>): Promise<T>;
function retry<T>(func: () => Promise<T>, retries: number): Promise<T>;
function retry<T>(func: () => Promise<T>, { retries, delay, signal }: RetryOptions): Promise<T>;
```

### 파라미터

- `func` (`() => Promise<T>`): `Promise`를 반환하는 함수.
- `retries`: 재시도할 횟수. 기본값은 `Number.POSITIVE_INFINITY`로, 성공할 때까지 재시도해요.
- `retryMinDelay`: 재시도 사이 간격의 최소값. 단위는 밀리세컨드(ms)로, 기본값은 `0`이에요.
- `retryMaxDelay`: 재시도 사이 간격의 최대값. 단위는 밀리세컨드(ms)로, 기본값은 `Infinity`에요.
- `factor`: 재시도 사이 간격을 조절하는 계수. 기본값은 `1`이에요.
- `randomize`: `factor`에 더해 랜덤 요소를 추가할지 여부. 기본값은 `false`에요.
- `signal`: 재시도를 취소할 수 있는 `AbortSignal`.

### 반환 값

(`Promise<T>`): `func` 함수가 반환하는 값.

### 오류

재시도 횟수가 `retries`에 도달하거나, `AbortSignal`로 취소되는 경우 오류가 발생해요.

## 예시

```typescript
// `fetchData`가 성공할 때까지 무한히 재시도해요.
const data1 = await retry(() => fetchData());
console.log(data1);

// `fetchData`가 성공할 때까지 3번만 재시도해요.
const data2 = await retry(() => fetchData(), 3);
console.log(data2);

// `fetchData`가 성공할 때까지 3번만 재시도하고, 100ms의 고정된 지연시간으로 재시도해요.
const data3 = await retry(() => fetchData(), { retries: 3, retryMinDelay: 100 });
console.log(data3);

// 재시도 간 지연 시간이 2배씩 증가합니다 (100ms, 200ms, 400ms).
const data4 = await retry(() => fetchData(), { retries: 3, retryMinDelay: 100, factor: 2 });
console.log(data4);

// 지수 백오프와 랜덤화된 지연 시간 (100~200ms) 사이에서 재시도합니다.
// 각 재시도의 지연 시간은 아래와 같이 계산됩니다:
// 1. 기본 지연 시간은 `retryMinDelay * factor^attempt`로 증가합니다.
// 2. 계산된 지연 시간은 `retryMaxDelay`로 제한됩니다.
// 3. `randomize`가 true이므로, 지연 시간이 1~2배 사이로 랜덤화됩니다.
//
// 예: 
// - 첫 번째 재시도: 100~200ms 범위
// - 두 번째 재시도: 200~400ms 범위
// - 세 번째 재시도: 400~800ms 범위
const data5 = await retry(() => fetchData(), { retries: 3, retryMinDelay: 100, retryMaxDelay: 1000, randomize: true });
console.log(data5);

const controller = new AbortController();

// `fetchData`를 재시도하는 작업을 `signal`로 취소할 수 있어요.
const data6 = await retry(() => fetchData(), { signal: controller.signal });
console.log(data6);
```
