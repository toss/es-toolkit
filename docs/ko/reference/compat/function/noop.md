# noop (Lodash 호환성)

::: warning `es-toolkit`의 `noop`을 사용하세요

`es-toolkit`에도 동일한 동작을 하는 [noop](../../function/noop.md) 함수가 있어요.

:::

아무것도 하지 않는 빈 함수예요.

```typescript
noop();
```

## 사용법

### `noop(...args)`

아무것도 하지 않는 플레이스홀더 함수가 필요할 때 `noop`을 사용하세요. 기본값이나 콜백 함수로 자주 사용돼요.

```typescript
import { noop } from 'es-toolkit/compat';

// 기본 사용법
noop(); // 아무것도 하지 않음
noop(1, 2, 3); // 인수를 받지만 아무것도 하지 않음

// 기본 콜백으로 사용
function processData(data, callback = noop) {
  // 데이터 처리
  console.log('데이터 처리 중...', data);

  // 콜백 호출 (제공되지 않았다면 noop)
  callback(data);
}

processData('테스트'); // 콜백이 제공되지 않았지만 오류 없이 동작

// 현대적인 대안 (권장)
function modernProcessData(data, callback = () => {}) {
  console.log('데이터 처리 중...', data);
  callback(data);
}

// 또는 선택적 콜백 사용
function processDataOptional(data, callback) {
  console.log('데이터 처리 중...', data);
  callback?.(data); // 콜백이 제공된 경우만 호출
}
```

기본값이나 플레이스홀더가 필요한 상황에서 유용하지만, 현대 JavaScript에서는 선택적 체이닝(`?.`)이나 기본 매개변수를 사용하는 것이 더 일반적이에요.

#### 파라미터

- `...args` (`any[]`): 어떤 인수들이든 받을 수 있지만 모두 무시돼요.

#### 반환 값

(`void`): 아무것도 반환하지 않아요.
