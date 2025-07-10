# hexToRgb

16진수 색상 문자열을 RGB 색상 값으로 변환해요.

이 함수는 16진수 색상 문자열(# 접두사가 있거나 없거나)을 받아서 RGB 색상 값으로 변환해요. 3자리 단축형 16진수 색상(예: '#f00')과 6자리 16진수 색상(예: '#ff0000') 모두 지원해요.

## 인터페이스

```typescript
function hexToRgb(hex: string): RgbColor;

interface RgbColor {
  r: number;
  g: number;
  b: number;
}
```

### 파라미터

- `hex` (`string`): 16진수 색상 문자열. `#` 접두사가 있어도 되고 없어도 돼요. 3자리(`#f00`)와 6자리(`#ff0000`) 형식을 모두 지원해요.

### 반환 값

(`RgbColor`): RGB 색상 값을 포함하는 객체를 반환해요.

- `r` (`number`): 빨간색 구성 요소 (0-255)
- `g` (`number`): 초록색 구성 요소 (0-255)
- `b` (`number`): 파란색 구성 요소 (0-255)

### 에러

16진수 문자열이 유효하지 않으면 에러를 던져요.

## 예시

```typescript
import { hexToRgb } from 'es-toolkit/color';

// # 접두사가 있는 6자리 16진수
hexToRgb('#ff0000'); // { r: 255, g: 0, b: 0 }
hexToRgb('#00ff00'); // { r: 0, g: 255, b: 0 }
hexToRgb('#0000ff'); // { r: 0, g: 0, b: 255 }

// # 접두사가 없는 6자리 16진수
hexToRgb('ff0000'); // { r: 255, g: 0, b: 0 }
hexToRgb('ffffff'); // { r: 255, g: 255, b: 255 }
hexToRgb('000000'); // { r: 0, g: 0, b: 0 }

// 3자리 16진수 (단축형)
hexToRgb('#f00'); // { r: 255, g: 0, b: 0 }
hexToRgb('#0f0'); // { r: 0, g: 255, b: 0 }
hexToRgb('00f'); // { r: 0, g: 0, b: 255 }

// 대소문자 혼합
hexToRgb('#FfA500'); // { r: 255, g: 165, b: 0 }

// 에러 케이스
hexToRgb('#gg0000'); // throws Error: Invalid hex color string
hexToRgb('#ff00'); // throws Error: Invalid hex color string
hexToRgb(''); // throws Error: Invalid hex color string
```
