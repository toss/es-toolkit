# rgbToHex

RGB 색상 값을 16진수 색상 문자열로 변환해요.

이 함수는 RGB 색상 값을 받아서 16진수 색상 문자열로 변환해요. 각 RGB 구성 요소는 0과 255 사이(포함)의 정수여야 해요.

## 인터페이스

```typescript
function rgbToHex(r: number, g: number, b: number): string;
```

### 파라미터

- `r` (`number`): 빨간색 색상 구성 요소. 0과 255 사이의 정수여야 해요.
- `g` (`number`): 초록색 색상 구성 요소. 0과 255 사이의 정수여야 해요.
- `b` (`number`): 파란색 색상 구성 요소. 0과 255 사이의 정수여야 해요.

### 반환 값

(`string`): RGB 값의 16진수 색상 문자열 표현. '#' 접두사가 포함돼요.

### 에러

RGB 값 중 하나라도 정수가 아니거나 0-255 범위를 벗어나면 에러를 던져요.

## 예시

```typescript
import { rgbToHex } from 'es-toolkit/color';

// 기본 색상
rgbToHex(255, 0, 0); // '#ff0000' (빨간색)
rgbToHex(0, 255, 0); // '#00ff00' (초록색)
rgbToHex(0, 0, 255); // '#0000ff' (파란색)

// 다른 색상
rgbToHex(255, 255, 255); // '#ffffff' (흰색)
rgbToHex(0, 0, 0); // '#000000' (검은색)
rgbToHex(255, 165, 0); // '#ffa500' (주황색)

// 경계 케이스
rgbToHex(0, 0, 0); // '#000000'
rgbToHex(255, 255, 255); // '#ffffff'

// 에러 케이스
rgbToHex(256, 0, 0); // throws Error: Invalid RGB value
rgbToHex(-1, 0, 0); // throws Error: Invalid RGB value
rgbToHex(1.5, 0, 0); // throws Error: Invalid RGB value
```
