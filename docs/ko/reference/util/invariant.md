# invariant

주어진 조건이 참임을 단언해요. 조건이 거짓이면 에러를 던져요.

```typescript
invariant(condition, message);
```

## 사용법

### `invariant(condition, message)`

코드에서 특정 조건이 반드시 만족되어야 할 때 `invariant`를 사용하세요. 조건이 거짓이면 즉시 에러를 던져서 프로그램 실행을 중단해요.

```typescript
import { invariant } from 'es-toolkit/util';

// 조건이 참이면 아무것도 하지 않아요
invariant(true, '이 메시지는 나타나지 않아요');

// 조건이 거짓이면 에러를 던져요
invariant(false, '이 조건은 거짓이에요'); // Error: 이 조건은 거짓이에요

// 값이 null이나 undefined가 아님을 확인할 때
const value = getValue();
invariant(value !== null && value !== undefined, '값이 null이나 undefined면 안 돼요');
// 이제 value는 null이나 undefined가 아니라고 확신할 수 있어요

// 숫자가 양수인지 확인할 때
const number = getNumber();
invariant(number > 0, '숫자는 양수여야 해요');
```

에러 객체를 직접 전달할 수도 있어요.

```typescript
import { invariant } from 'es-toolkit/util';

// Error 객체 전달
invariant(false, new Error('커스텀 에러 메시지'));

// 커스텀 에러 클래스 사용
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

invariant(false, new ValidationError('검증에 실패했어요'));
```

개발 중에 코드의 가정을 검증하거나, 함수의 입력값이 예상 범위에 있는지 확인할 때 특히 유용해요.

#### 파라미터

- `condition` (`unknown`): 평가할 조건이에요. 거짓으로 평가되는 값이면 에러를 던져요.
- `message` (`string | Error`): 조건이 거짓일 때 던질 에러 메시지나 에러 객체예요.

#### 반환 값

(`void`): 조건이 참이면 아무것도 반환하지 않아요.

#### 에러

조건이 거짓으로 평가되면 제공된 메시지나 에러 객체를 던져요.
