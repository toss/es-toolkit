# stubString (Lodash 호환성)

::: warning 빈 문자열 리터럴 `''`을 사용하세요

이 `stubString` 함수는 불필요한 함수 호출로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 빈 문자열 리터럴 `''`을 사용하세요.

:::

항상 빈 문자열을 반환해요.

```typescript
const emptyString = stubString();
```

## 레퍼런스

### `stubString()`

항상 빈 문자열이 필요한 콜백 함수나 기본값으로 사용할 때 `stubString`을 사용하세요. 문자열 처리나 조건부 로직에서 일관된 빈 문자열을 제공할 때 유용해요.

```typescript
import { stubString } from 'es-toolkit/compat';

// 기본값으로 빈 문자열 제공
function processText(text = stubString()) {
  return text.trim().toUpperCase();
}

processText(); // ''
processText('hello'); // 'HELLO'
```

조건부 설정에서 기본값으로도 사용할 수 있어요.

```typescript
import { stubString } from 'es-toolkit/compat';

// 조건에 따른 문자열 반환
const getMessage = (hasMessage: boolean) => {
  return hasMessage ? 'Welcome!' : stubString();
};

getMessage(true); // 'Welcome!'
getMessage(false); // ''
```

#### 파라미터

없음.

### 반환 값

(`string`): 항상 빈 문자열을 반환해요.
