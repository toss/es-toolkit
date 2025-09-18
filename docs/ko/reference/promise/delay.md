# delay

코드 실행을 지정된 시간만큼 지연시켜요.

```typescript
await delay(ms, options?);
```

## 레퍼런스

### `delay(ms, options?)`

코드 실행을 특정 시간만큼 멈추고 싶을 때 `delay`를 사용하세요. async/await와 함께 사용해서 일정 시간 후에 다음 코드가 실행되도록 할 수 있어요. 필요한 경우 `AbortSignal`을 통해 지연을 취소할 수도 있어요.

```typescript
import { delay } from 'es-toolkit/promise';

async function example() {
  console.log('시작');
  await delay(1000); // 1초 동안 실행을 지연해요
  console.log('1초 후 실행됩니다');

  await delay(500); // 0.5초 더 지연해요
  console.log('추가로 0.5초 후 실행됩니다');
}

example();
```

AbortSignal을 사용해서 지연을 취소할 수도 있어요:

```typescript
async function cancellableDelay() {
  const controller = new AbortController();
  const { signal } = controller;

  // 50ms 후에 지연을 취소해요
  setTimeout(() => controller.abort(), 50);

  try {
    await delay(1000, { signal });
    console.log('1초가 지났습니다'); // 이 코드는 실행되지 않아요
  } catch (error) {
    console.log('지연이 취소되었습니다'); // AbortError가 발생해요
  }
}
```

테스트에서 비동기 동작을 시뮬레이션할 때도 유용해요.

```typescript
async function simulateNetworkRequest() {
  console.log('네트워크 요청 시작...');
  await delay(2000); // 2초간 네트워크 지연 시뮬레이션
  console.log('응답 받음!');
  return { data: 'test' };
}
```

#### 파라미터

- `ms` (`number`): 지연시킬 밀리초 단위 시간이에요.
- `options` (`DelayOptions`, 선택): 지연 옵션이에요.
  - `signal` (`AbortSignal`, 선택): 지연을 취소할 수 있는 AbortSignal이에요.

#### 반환 값

(`Promise<void>`): 지정된 시간 후에 완료되는 Promise를 반환해요.

#### 에러

AbortSignal이 활성화되면 `AbortError`를 던져요.
