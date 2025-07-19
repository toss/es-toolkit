# isValidHex

문자열이 유효한 16진수 색상 문자열인지 검증해요.

이 함수는 주어진 문자열이 유효한 16진수 색상 값을 나타내는지 확인해요. 3자리와 6자리 16진수 문자열을 모두 허용하고 대소문자를 구분하지 않아요. 입력값에는 '#' 접두사가 포함되어서는 안 돼요.

## 인터페이스

```typescript
function isValidHex(hex: string): boolean;
```

### 파라미터

- `hex` (`string`): 검증할 16진수 색상 문자열('#' 접두사 제외). 3자리 또는 6자리여야 해요.

### 반환 값

(`boolean`): 16진수 문자열이 유효하면 `true`, 그렇지 않으면 `false`를 반환해요.

## 예시

```typescript
import { isValidHex } from 'es-toolkit/color';

// 유효한 6자리 16진수 문자열
isValidHex('ff0000'); // true (빨간색)
isValidHex('00ff00'); // true (초록색)
isValidHex('0000ff'); // true (파란색)
isValidHex('ffffff'); // true (흰색)
isValidHex('000000'); // true (검은색)
isValidHex('123456'); // true
isValidHex('abcdef'); // true

// 유효한 3자리 16진수 문자열
isValidHex('f00'); // true (빨간색)
isValidHex('0f0'); // true (초록색)
isValidHex('00f'); // true (파란색)
isValidHex('fff'); // true (흰색)
isValidHex('000'); // true (검은색)
isValidHex('123'); // true
isValidHex('abc'); // true

// 대소문자 혼합 (유효함)
isValidHex('FF0000'); // true
isValidHex('fF0000'); // true
isValidHex('aB12Cd'); // true
isValidHex('AbC'); // true

// 유효하지 않은 길이
isValidHex(''); // false
isValidHex('f'); // false
isValidHex('ff'); // false
isValidHex('ff00'); // false (4자리)
isValidHex('ff000'); // false (5자리)
isValidHex('ff00000'); // false (7자리)

// 유효하지 않은 문자
isValidHex('gg0000'); // false
isValidHex('ff00xx'); // false
isValidHex('ff00!!'); // false
isValidHex('xyz'); // false
```
