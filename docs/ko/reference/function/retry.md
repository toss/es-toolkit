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
- `delay`: 재시도 사이 간격. 단위는 밀리세컨드(ms)로, 기본값은 `0`이에요.
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

// `fetchData`가 성공할 때까지 3번만 재시도하고, 중간에 100ms씩 간격이 있어요.
const data3 = await retry(() => fetchData(), { retries: 3, delay: 100 });
console.log(data3);

const controller = new AbortController();

// `fetchData`를 재시도하는 작업을 `signal`로 취소할 수 있어요.
const data4 = await retry(() => fetchData(), { signal: controller.signal });
console.log(data4);
```
