# isRegExp (Lodash 호환성)

::: warning es-toolkit의 [isRegExp](../../predicate/isRegExp.md)를 사용하세요

이 `isRegExp` 함수는 Lodash 호환성을 위한 함수이지만, 단순한 타입 확인이에요.

대신 더 빠르고 현대적인 `es-toolkit`의 [isRegExp](../../predicate/isRegExp.md)를 사용하세요.

:::

값이 정규식인지 확인해요.

```typescript
const result = isRegExp(value);
```

## 사용법

### `isRegExp(value)`

값이 정규식인지 타입 안전하게 확인하고 싶을 때 `isRegExp`을 사용하세요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isRegExp } from 'es-toolkit/compat';

// 정규식들
isRegExp(/abc/); // true
isRegExp(new RegExp('abc')); // true
isRegExp(/[a-z]+/g); // true
isRegExp(/pattern/gi); // true

// 다른 타입들은 false
isRegExp('/abc/'); // false (문자열)
isRegExp('pattern'); // false (문자열)
isRegExp({}); // false (객체)
isRegExp([]); // false (배열)
isRegExp(null); // false
isRegExp(undefined); // false
isRegExp(123); // false (숫자)
```

정규식 문자열과 실제 정규식 객체를 구분해요.

```typescript
import { isRegExp } from 'es-toolkit/compat';

// 정규식 vs 정규식 문자열
isRegExp(/test/); // true
isRegExp('/test/'); // false
isRegExp('\\d+'); // false
isRegExp('/\\d+/g'); // false

// 다양한 정규식 플래그들
isRegExp(/test/i); // true (대소문자 무시)
isRegExp(/test/g); // true (전역 검색)
isRegExp(/test/m); // true (다중행)
isRegExp(/test/gim); // true (모든 플래그 조합)
```

동적으로 생성된 정규식도 인식해요.

```typescript
import { isRegExp } from 'es-toolkit/compat';

// RegExp 생성자로 만든 정규식
const dynamicRegex = new RegExp('\\d{3}-\\d{4}', 'g');
isRegExp(dynamicRegex); // true

// 문자열을 통해 생성한 정규식
const pattern = 'hello';
const flags = 'gi';
const regex = new RegExp(pattern, flags);
isRegExp(regex); // true
```

#### 파라미터

- `value` (`any`): 정규식인지 확인할 값이에요.

#### 반환 값

(`value is RegExp`): 값이 정규식이면 `true`, 아니면 `false`를 반환해요.
