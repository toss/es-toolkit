# before

주어진 함수(`func`)의 호출 횟수를 제한하는 새로운 함수를 생성해요.

## 인터페이스

```typescript
function before<F extends (...args: any[]) => any>(
  n: number,
  func: F
): (...args: Parameters<F>) => ReturnType<F> | undefined;
```

### 파라미터

- `n` (`number`): 반환된 함수가 `func`를 호출하기 전까지 허용된 호출 횟수예요.
  - `n`이 0이면, `func`는 호출되지 않아요.
  - `n`이 양의 정수인 경우, `func`는 최대 `n-1`번 호출돼요.
- `func` (`F`): 호출 횟수 제한이 적용될 함수예요.

### 반환 값

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): 새로운 함수를 반환해요. 이 함수는 다음과 같은 기능을 가져요.

- 호출 횟수를 추적해요.
- `n-1`번째 호출까지 `func`를 호출해요.
- 호출 횟수가 `n`에 도달하거나, 초과하면 `undefined`를 반환하여 함수 호출을 중지해요.

### 에러

`n`이 음수일 경우 오류를 발생시켜요.

## 예시

```typescript
import { before } from 'es-toolkit/function';

const mockFn = () => {
  console.log('실행됨');
};
const beforeFn = after(3, mockFn);

// '실행됨'을 로깅해요.
beforeFn();

// '실행됨'을 로깅해요.
beforeFn();

// 아무것도 로깅하지 않아요.
beforeFn();
```

## Lodash와의 호환성

`es-toolkit/compat`에서 `before`를 가져오면 lodash와 호환돼요.

- `n`이 음수여도 에러를 던지지 않아요.
- `func`가 함수가 아니면 에러를 던져요.
- 호출 횟수가 `n`에 도달하거나 초과하면 `func`의 마지막 결과를 반환해요.

```typescript
import { before } from 'es-toolkit/compat';

let count = 0;

const before3 = before(3, () => {
  console.log('카운트를 증가시켜요...');
  return ++count;
});

console.log(before3()); // 카운트를 증가시켜요... => 1
console.log(before3()); // 카운트를 증가시켜요... => 2
console.log(before3()); //                   => 2
```
