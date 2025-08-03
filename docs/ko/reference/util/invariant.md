# invariant

주어진 조건이 참임을 단언해요. 조건이 거짓이면 제공된 메시지나 오류 함수와 함께 오류를 던져요.

## 인터페이스

```typescript
function invariant(condition: unknown, message: string): asserts condition;
function invariant(condition: unknown, error: () => Error): asserts condition;
```

### 파라미터

- `condition` (`unknown`): 평가할 조건.
- `message` (`string` | `() => Error`): 조건이 거짓일 때 발생할 오류 메시지나 오류 함수.

### 반환 값

(`void`): 조건이 참이면 void를 반환해요.

### 에러

조건이 거짓이면 주어진 메시지와 함께 에러를 던져요.

## 예시

```typescript
// This call will succeed without any errors
invariant(true, 'This should not throw');

// This call will fail and throw an error with the message 'This should throw'
invariant(false, 'This should throw');

// Example of using invariant with a condition
invariant(condition, 'Expected condition is false');

// Ensure that the value is neither null nor undefined
invariant(value !== null && value !== undefined, 'Value should not be null or undefined');

// Example of using invariant to check if a number is positive
invariant(number > 0, 'Number must be positive');

// Example of using invariant with an error function
invariant(false, () => new Error('This should throw'));

// Example of using invariant with a custom error function
class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }
}
invariant(false, () => new CustomError('This should throw'));
```
