# color

터미널 색상과 스타일을 적용해요. 색상 지원 여부는 자동으로 감지해요.

모든 유틸리티는 개별 named export로도, default export 번들로도 쓸 수 있어요. 각 함수는 ANSI 색상 지원 여부를 자동으로 판단해서, 지원하지 않는 환경(non-TTY, `NO_COLOR=1`, 파이프, `FORCE_COLOR` 없는 CI)에서는 입력 텍스트를 그대로 반환해요.

```typescript
// 개별 import (트리셰이킹 가능):
import { bold, hex, red } from 'es-toolkit/color';
// 또는 default 번들:
import color from 'es-toolkit/color';

color.red('에러');
```

## 사용 가능한 유틸리티

### 수정자

`reset`, `bold`, `dim`, `italic`, `underline`, `inverse`, `hidden`, `strikethrough`

### 전경색

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`

### 밝은 전경색

`blackBright`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

### 배경색

`bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`

### 밝은 배경색

`bgBlackBright`, `bgRedBright`, `bgGreenBright`, `bgYellowBright`, `bgBlueBright`, `bgMagentaBright`, `bgCyanBright`, `bgWhiteBright`

### 확장 색상

`ansi256(code)`, `bgAnsi256(code)`, `rgb(r, g, b)`, `bgRgb(r, g, b)`, `hex(color)`, `bgHex(color)`

## 사용법

### 기본 색상과 스타일

```typescript
import { bgYellow, black, blue, bold, green, red, underline } from 'es-toolkit/color';

red('빨간 텍스트');
green('초록 텍스트');
blue('파란 텍스트');

bold('굵은 텍스트');
underline('밑줄 텍스트');

bgYellow(black('노란 배경에 검정 텍스트'));
```

### 합성

여러 스타일을 중첩해서 사용할 수 있어요. inner이 닫히면 outer이 자동으로 재개방돼서 뒤따르는 텍스트도 색이 유지돼요.

```typescript
import { bold, red } from 'es-toolkit/color';

bold(red('굵은 빨간 텍스트'));
red(`상태: ${bold('중요')} — 확인 부탁해요`);
```

### 확장 색상

256색, RGB, Hex 색상은 커링 방식이에요. 색상 값을 먼저 넘기고 텍스트를 이후에 넘겨요.

```typescript
import { ansi256, bgAnsi256, bgHex, bgRgb, hex, rgb } from 'es-toolkit/color';

ansi256(196)('밝은 빨강');
bgAnsi256(21)('파란 배경');

rgb(255, 128, 0)('주황색');
bgRgb(0, 255, 0)('초록 배경');

hex('#ff00ff')('마젠타');
hex('#f0f')('마젠타'); // 짧은 형식
bgHex('#00ff00')('초록 배경');
```

### 입력 타입

모든 색상 함수는 `string`을 받아요. 다른 값은 넘기기 전에 변환해 주세요.

```typescript
import { red } from 'es-toolkit/color';

red(String(42)); // '42'
red(JSON.stringify({ a: 1 }));
```
