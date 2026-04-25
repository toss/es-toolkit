# color

ANSI 이스케이프 코드로 터미널 색상과 스타일을 적용해요.

모든 유틸리티는 개별 named export로도, default export 번들로도 쓸 수 있어요. 색상 함수는 항상 ANSI 이스케이프 코드를 출력해요. 출력에 코드가 들어가면 안 되는 곳 — 로그 파일, 파이프, ANSI를 지원하지 않는 터미널 — 에서는 결과를 `stripColor`에 통과시켜 주세요.

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

스타일을 자유롭게 겹쳐서 쓸 수 있어요. 안쪽 스타일이 문자열 중간에 끝나도 바깥 스타일은 그 뒤의 텍스트에 그대로 이어져요. 따로 다시 씌워줄 필요 없어요.

```typescript
import { bold, red } from 'es-toolkit/color';

bold(red('굵은 빨간 텍스트'));
red(`상태: ${bold('중요')} — 확인 부탁해요`);
```

### 색상 코드 제거

결과를 `stripColor`에 통과시키면 ANSI 이스케이프 코드를 전부 제거할 수 있어요. 로그 파일에 쓰거나, 다른 명령으로 파이프할 때, ANSI를 지원하지 않는 CI에서 유용해요.

```typescript
import { red, stripColor } from 'es-toolkit/color';

stripColor(red('일반 텍스트')); // '일반 텍스트'
```

### 확장 색상

256색, RGB, Hex는 두 단계로 호출해요. 먼저 색상을 넘겨서 함수를 만들고, 그 함수에 텍스트를 넘겨요.

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
