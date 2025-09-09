# Mutex

비동기 작업이 특정 코드 영역에서 동시에 한 번만 실행되도록 할 수 있는 뮤텍스(Mutex)예요.

## 인터페이스

```typescript
class Mutex {
  isLocked: boolean;

  acquire(): Promise<void>;
  release(): void;
}
```

## 프로퍼티

- `isLocked` (`boolean`): 현재 뮤텍스가 사용 중인지 여부. `true`라면 이미 실행 중인 비동기 작업이 있다는 뜻이에요.

## 메서드

- `acquire` (`() => Promise<void>`): 허가를 받고 비동기 작업을 실행하거나, 허가를 받을 때까지 기다려요.
- `release` (`() => void`): 대기 중인 다음 작업이 실행될 수 있도록 해요.

## 예시

```typescript
const mutex = new Mutex();

async function criticalSection() {
  await mutex.acquire();
  try {
    // This code section cannot be executed simultaneously
  } finally {
    mutex.release();
  }
}

criticalSection();
criticalSection(); // This call will wait until the first call releases the mutex.
```
