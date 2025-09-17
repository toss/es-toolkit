# once (Lodash 호환성)

::: warning `es-toolkit`의 `once`를 사용하세요

이 `once` 함수는 `es-toolkit`의 메인 라이브러리 `once` 함수를 단순히 리이크스포트한 것이에요. 직접 메인 라이브러리를 사용하는 것이 더 효율적이에요.

대신 더 빠르고 현대적인 `es-toolkit`의 [once](../../function/once.md)를 사용하세요.

:::

함수가 한 번만 호출되도록 제한해요.

```typescript
const limitedFunc = once(func);
```

## 레퍼런스

### `once(func)`

함수가 한 번만 호출되도록 제한하고 싶을 때 `once`를 사용하세요. 첫 번째 호출 후에는 결과가 캐시되어 동일한 값을 반환해요.

```typescript
import { once } from 'es-toolkit/compat';

// 기본 사용법
let count = 0;
const increment = once(() => {
  count++;
  console.log('카운터 증가:', count);
  return count;
});

increment(); // '카운터 증가: 1' 출력, 1 반환
increment(); // 아무것도 출력하지 않음, 1 반환
increment(); // 아무것도 출력하지 않음, 1 반환

// 실용 예시 - 초기화 함수
const initialize = once(() => {
  console.log('애플리케이션 초기화 중...');
  // 비용 많은 초기화 작업
  return '초기화 완료';
});

// 여러 번 호출해도 초기화는 한 번만 실행됨
initialize(); // '애플리케이션 초기화 중...' 출력
initialize(); // 아무것도 출력하지 않음
```

비용이 많이 드는 초기화 작업이나 설정 함수를 만들 때 유용해요. 예를 들어 데이터베이스 연결, API 토큰 초기화 등에 사용할 수 있어요.

#### 파라미터

- `func` (`Function`): 한 번만 호출되도록 제한할 함수예요.

### 반환 값

(`Function`): 한 번만 호출되는 새로운 함수를 반환해요. 두 번째 호출부터는 첫 번째 호출의 결과를 반환해요.
