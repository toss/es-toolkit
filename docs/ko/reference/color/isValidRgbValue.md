# isValidRgbValue

숫자가 유효한 RGB 색상 값인지 검증해요.

이 함수는 주어진 숫자가 유효한 RGB 색상 구성 요소를 나타내는지 확인해요. 유효한 RGB 값은 0과 255 사이(포함)의 정수여야 해요.

## 인터페이스

```typescript
function isValidRgbValue(value: number): boolean;
```

### 파라미터

- `value` (`number`): RGB 색상 구성 요소로 검증할 숫자.

### 반환 값

(`boolean`): 값이 유효한 RGB 색상 구성 요소이면 `true`, 그렇지 않으면 `false`를 반환해요.

## 예시

```typescript
import { isValidRgbValue } from 'es-toolkit/color';

// 유효한 RGB 값
isValidRgbValue(0); // true (최솟값)
isValidRgbValue(255); // true (최댓값)
isValidRgbValue(128); // true (중간값)
isValidRgbValue(42); // true

// 유효하지 않은 RGB 값 - 범위 벗어남
isValidRgbValue(-1); // false (최솟값 미만)
isValidRgbValue(256); // false (최댓값 초과)
isValidRgbValue(300); // false (최댓값 초과)

// 유효하지 않은 RGB 값 - 정수가 아님
isValidRgbValue(1.5); // false (소수)
isValidRgbValue(255.1); // false (소수)
isValidRgbValue(42.999); // false (소수)

// 유효하지 않은 RGB 값 - 숫자가 아님
isValidRgbValue(NaN); // false
isValidRgbValue(Infinity); // false
isValidRgbValue(-Infinity); // false
```
