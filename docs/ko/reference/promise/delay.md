# delay

코드의 실행을 주어진 밀리세컨드만큼 지연시켜요.

이 함수는 특정한 시간 이후에 Resolve되는 Promise를 반환해요. async/await 함수를 사용하는 경우에 함수의 실행을 잠깐 일시정지시킬 수 있어요. 또한, 선택 옵션으로 지연을 취소할 수 있는 AbortSignal을 지원해요.

## 인터페이스

```typescript
function delay(ms: number, options?: DelayOptions): Promise<void>;
```

### 파라미터

- `ms` (`number`): 코드 실행을 지연시킬 밀리세컨드.
- `options` (`DelayOptions`, optional): 옵션 객체.
  - `signal` (`AbortSignal`, optional): 지연을 취소하기 위한 선택적 `AbortSignal`.

### 반환 값

(`Promise<void>`): 정해진 지연시간 이후에 Resolve될 Promise.

## 예시

### 기본 사용법

```typescript
async function foo() {
  console.log('시작');
  await delay(1000); // 코드 실행을 1초동안 지연
  console.log('끝');
}

foo();
```

### AbortSignal 사용법

```typescript
async function foo() {
  const controller = new AbortController();
  const signal = controller.signal;

  setTimeout(() => controller.abort(), 50); // 50ms 후 지연을 취소
  try {
    await delay(1000, { signal });
  } catch (error) {
    console.log(error); // 'The operation was aborted' 로깅
  }
}
```

## Lodash 호환성

`es-toolkit/compat`에서 `delay`를 가져오면 lodash와 호환돼요.

- `delay`는 일정 시간이 지난 후 호출될 함수를 받을 수 있어요.
- `delay`는 함수에 전달될 인수를 받을 수 있어요.
- `delay`는 타임아웃을 취소할 수 있는 타이머 ID를 반환해요.

```typescript
import { delay } from 'es-toolkit/compat';

// 예제 1: 지연된 함수 실행
const timerId = delay(
  (greeting, recipient) => {
    console.log(`${greeting}, ${recipient}!`);
  },
  1000,
  '안녕하세요',
  '홍길동'
);
// => 1초 후 '안녕하세요, 홍길동!'이 로그로 출력돼요.

// 예제 2: 실행 전에 타임아웃 취소
clearTimeout(timerId);
// 타임아웃이 취소되었기 때문에 함수는 실행되지 않아요.
```
