# rest (Lodash 호환성)

::: warning `es-toolkit`의 `rest`를 사용하세요

이 `rest` 함수는 기본값 처리나 인덱스 유효성 검사 등의 추가 로직으로 인해 성능이 떨어질 수 있어요.

대신 더 빠르고 현대적인 `es-toolkit`의 [rest](../../function/rest.md)를 사용하세요.

:::

지정된 인덱스부터 나머지 인수들을 배열로 그룹화하는 함수를 만들어요.

```typescript
const restFunc = rest(func, start);
```

## 레퍼런스

### `rest(func, start)`

함수의 인수들을 변환하여 지정된 인덱스부터 나머지 인수들을 배열로 그룹화하고 싶을 때 `rest`를 사용하세요. 가변 인수를 받는 함수를 만들 때 유용해요.

```typescript
import { rest } from 'es-toolkit/compat';

// 기본 사용법 - 마지막 인수들을 배열로 그룹화
function logMessage(level, message, ...details) {
  console.log(`[${level}] ${message}`, details);
}

const restLogger = rest(logMessage, 2);
restLogger('ERROR', '오류 발생', '상세정보 1', '상세정보 2');
// 내부적으로 logMessage('ERROR', '오류 발생', ['상세정보 1', '상세정보 2'])로 호출

// 다른 인덱스 예시
function process(action, target, ...args) {
  return { action, target, args };
}

const restProcess = rest(process, 1);
restProcess('update', 'user', 'name', 'John', 'age', 25);
// { action: 'update', target: ['user', 'name', 'John', 'age', 25], args: undefined }
```

함수의 마지막 인수들을 배열로 받고 싶을 때 사용하면 됩니다. 현대 JavaScript에서는 나머지 매개변수 문법(`...args`)을 사용하는 것이 더 일반적이에요.

#### 파라미터

- `func` (`Function`): 변환할 함수예요.
- `start` (`number`, 선택): 배열로 그룹화를 시작할 인덱스예요. 기본값은 `func.length - 1`이에요.

#### 반환 값

(`Function`): 지정된 인덱스부터 나머지 인수들을 배열로 그룹화하는 새로운 함수를 반환해요.
