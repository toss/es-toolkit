# stubString (Lodash 호환성)

::: warning `''`를 직접 사용하세요

이 `stubString` 함수는 단순히 빈 문자열을 반환하는 래퍼 함수로 불필요한 추상화예요.

대신 더 빠르고 직접적인 `''`를 사용하세요.

:::

항상 빈 문자열을 반환해요.

```typescript
const emptyString = stubString();
```

## 레퍼런스

### `stubString()`

항상 빈 문자열을 반환하는 함수예요. 기본값으로 빈 문자열이 필요하거나 함수형 프로그래밍에서 일관된 반환값이 필요할 때 사용해요.

```typescript
import { stubString } from 'es-toolkit/compat';

// 빈 문자열을 반환해요
const emptyString = stubString();
console.log(emptyString); // => ''

// 기본값으로 사용해요
function formatMessage(message = stubString()) {
  return message || '기본 메시지';
}

console.log(formatMessage()); // => '기본 메시지'
console.log(formatMessage('안녕하세요')); // => '안녕하세요'

// 함수형 프로그래밍에서 사용해요
const createEmpty = () => stubString();
const str = createEmpty();
console.log(str.length); // => 0
```

매번 동일한 빈 문자열을 반환해요.

```typescript
import { stubString } from 'es-toolkit/compat';

const str1 = stubString();
const str2 = stubString();

console.log(str1 === str2); // => true
console.log(typeof str1); // => 'string'
console.log(str1.length); // => 0
```

#### 파라미터

없음.

### 반환 값

(`string`): 항상 빈 문자열을 반환해요.