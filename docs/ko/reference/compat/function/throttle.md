# throttle (Lodash 호환성)

::: warning `es-toolkit`의 `throttle`을 사용하세요

이 `throttle` 함수는 Lodash 호환성을 위해 debounce 함수를 내부적으로 사용해서 방식이 조금 복잡해요. 또한 기본값 처리나 옵션 처리 등이 더 복잡해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [throttle](../../function/throttle.md)을 사용하세요.

:::

함수 호출을 지정된 시간 간격마다 최대 한 번만 실행되도록 제한해요.

```typescript
const throttledFunc = throttle(func, wait, options);
```

## 레퍼런스

### `throttle(func, wait, options)`

함수 호출을 지정된 시간 간격마다 최대 한 번만 실행되도록 제한하고 싶을 때 `throttle`을 사용하세요. 이벤트 핸들러나 API 호출 빈도를 제한할 때 유용해요.

```typescript
import { throttle } from 'es-toolkit/compat';

// 기본 사용법 - 1초마다 최대 한 번 실행
const throttledLog = throttle(() => {
  console.log('이벤트 발생!');
}, 1000);

// 옵션을 사용한 예시
const throttledScroll = throttle(handleScroll, 100, {
  leading: true,  // 처음에 바로 실행
  trailing: false // 마지막에 실행하지 않음
});

window.addEventListener('scroll', throttledScroll);
```

스크롤 이벤트나 리사이즈 이벤트처럼 빠르게 발생하는 이벤트를 처리할 때 성능을 위해 필수적이에요.

#### 파라미터

- `func` (`Function`): 스로틀링할 함수예요.
- `wait` (`number`, 선택): 밀리세컨드 단위의 대기 시간이에요. 기본값은 `0`이에요.
- `options` (`ThrottleSettings`, 선택): 스로틀링 옵션이에요.
  - `leading` (`boolean`): 첫 번째 호출에서 바로 실행할지 여부예요. 기본값은 `true`예요.
  - `trailing` (`boolean`): 마지막 호출 후에 실행할지 여부예요. 기본값은 `true`예요.

### 반환 값

(`DebouncedFunc`): 스로틀링된 함수를 반환해요. `cancel()` 메소드로 대기 중인 실행을 취소할 수 있어요.
