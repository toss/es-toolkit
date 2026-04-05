# colorLevel

현재 터미널 환경의 색상 지원 수준을 나타내는 값이에요.

```typescript
import { colorLevel, isColorSupported } from 'es-toolkit/color';
```

## 사용법

### `colorLevel`

터미널이 지원하는 색상 수준을 숫자로 반환해요.

| 값  | 의미        | 색상 수        |
| --- | ----------- | -------------- |
| `0` | 색상 미지원 | -              |
| `1` | 기본 색상   | 16색           |
| `2` | 256색       | 256색          |
| `3` | Truecolor   | 1600만색 (RGB) |

```typescript
import { colorLevel } from 'es-toolkit/color';

if (colorLevel >= 2) {
  // 256색 이상 지원하는 터미널
}
```

### `isColorSupported`

색상 출력이 가능한지 여부를 나타내는 불리언 값이에요. `colorLevel > 0`과 동일해요.

```typescript
import { isColorSupported } from 'es-toolkit/color';

if (isColorSupported) {
  console.log('이 터미널은 색상을 지원해요');
}
```

## 감지 순서

색상 수준은 다음 순서로 감지돼요.

1. **FORCE_COLOR** — 사용자가 명시적으로 색상 수준을 강제해요. `"0"`이면 비활성화, `"1"`~`"3"`이면 해당 수준으로 설정해요.
2. **NO_COLOR** — 사용자가 명시적으로 색상을 비활성화해요.
3. **TTY 확인** — stdout이 터미널이 아니면 (파이프, 리다이렉트 등) 색상을 비활성화해요.
4. **Windows** — Windows Terminal(truecolor)과 ConEmu를 감지해요. 그 외 Windows 터미널은 기본 16색이에요.
5. **COLORTERM** — `truecolor` 또는 `24bit`이면 Truecolor로 감지해요. iTerm2, Alacritty 등의 터미널이 설정해요.
6. **TERM** — `256color`가 포함되면 256색으로 감지해요. (예: `xterm-256color`)
7. **hasColors()** — Node.js 내장 API(11.13+)로 터미널 색상 능력을 직접 확인해요.
8. **기본값** — TTY가 확인된 경우 기본 16색이에요.

`FORCE_COLOR`와 `NO_COLOR`는 빈 문자열(`""`)일 때 "설정되지 않음"으로 처리돼요. 이는 각각 [force-color.org](https://force-color.org/)와 [no-color.org](https://no-color.org/) 스펙을 따른 것이에요.
