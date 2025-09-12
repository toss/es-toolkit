# noop

아무것도 하지 않는 빈 함수예요.

```typescript
noop();
```

## 레퍼런스

### `noop()`

아무 동작도 하지 않는 함수가 필요할 때 `noop`을 사용하세요.

함수가 필수인 곳에서 기본값으로 사용하거나, 콜백 함수를 비활성화하고 싶을 때 유용해요. 플레이스홀더 역할이나 초기화 단계에서 자주 사용해요.

```typescript
import { noop } from 'es-toolkit/function';

// 선택적 콜백의 기본값으로 사용
interface EventHandlers {
  onSuccess?: () => void;
  onError?: () => void;
}

function processData({ onSuccess = noop, onError = noop }: EventHandlers = {}) {
  try {
    // 데이터 처리 로직
    console.log('데이터 처리 완료');
    onSuccess(); // 안전하게 호출 가능
  } catch (error) {
    onError(); // 안전하게 호출 가능
  }
}

// undefined 체크 없이 안전하게 사용
processData({
  onSuccess: () => console.log('성공!'),
  // onError는 noop으로 기본값 처리됨
});
```

배열의 메서드에서도 사용할 수 있어요.

```typescript
import { noop } from 'es-toolkit/function';

// 조건부로 함수 실행
const operations = [
  () => console.log('첫 번째 작업'),
  shouldRunSecond ? () => console.log('두 번째 작업') : noop,
  () => console.log('세 번째 작업'),
];

operations.forEach(op => op()); // 모든 작업을 안전하게 실행
```

#### 반환 값

(`void`): 아무것도 반환하지 않아요.
