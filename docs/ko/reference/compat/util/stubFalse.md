# stubFalse (Lodash 호환성)

::: warning `false` 리터럴을 사용하세요

이 `stubFalse` 함수는 불필요한 함수 호출로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `false` 리터럴을 사용하세요.

:::

항상 `false` 값을 반환해요.

```typescript
const result = stubFalse();
```

## 레퍼런스

### `stubFalse()`

항상 `false` 값이 필요한 콜백 함수나 기본값으로 사용할 때 `stubFalse`를 사용하세요. 배열 메서드의 필터링이나 조건부 로직에서 일관된 `false` 값을 제공할 때 유용해요.

```typescript
import { stubFalse } from 'es-toolkit/compat';

// 배열에서 모든 요소를 제거하는 필터
const items = [1, 2, 3, 4, 5];
const emptyArray = items.filter(stubFalse);
console.log(emptyArray); // []
```

조건부 설정에서 기본값으로도 사용할 수 있어요.

```typescript
import { stubFalse } from 'es-toolkit/compat';

// 기본적으로 비활성화된 옵션들
const defaultOptions = {
  enableLogging: stubFalse(),
  enableDebug: stubFalse(),
  enableCache: stubFalse()
};

console.log(defaultOptions); // { enableLogging: false, enableDebug: false, enableCache: false }
```

#### 파라미터

없음.

### 반환 값

(`boolean`): 항상 `false`를 반환해요.
