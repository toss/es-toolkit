# Semaphore

동시에 실행되는 비동기 작업의 숫자를 제한하기 위해 사용할 수 있는 세마포어예요.

- `acquire` 메서드를 실행하면, 허가를 받고 비동기 작업을 실행하거나, 허가를 받을 때까지 기다려요.
- `release` 메서드를 실행하면, 대기 중인 다음 작업이 실행될 수 있도록 해요.

이 세마포어는 `acquire`를 실행한 순서에 따라 선착순으로 비동기 작업을 실행해요.

## Signature

```typescript
class Semaphore {
  public capacity: number;
  public available: number;

  constructor(capacity: number);

  acquire(): Promise<void>;
  release(): void;
}
```

## 프로퍼티

- `capacity` (`number`): 동시에 실행될 수 있는 작업의 최댓값.
- `available` (`number`): 현재 남은 실행 가능한 작업의 숫자.

## 메서드

- `acquire` (`() => Promise<void>`): 허가를 받고 비동기 작업을 실행하거나, 허가를 받을 때까지 기다려요.
- `release` (`() => void`): 대기 중인 다음 작업이 실행될 수 있도록 해요.

## 예시

```typescript
const sema = new Semaphore(2);

async function task() {
  await sema.acquire();
  try {
    // This code can only be executed by two tasks at the same time
  } finally {
    sema.release();
  }
}

task();
task();
task(); // This task will wait until one of the previous tasks releases the semaphore.
```
