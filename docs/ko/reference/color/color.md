# color

문자열에 ANSI 이스케이프 코드로 색상과 스타일을 입혀요.

```typescript
import { red } from 'es-toolkit/color';

red('에러');
```

## 사용 가능한 유틸리티

### 텍스트 효과

`reset`, `bold`, `dim`, `italic`, `underline`, `inverse`, `hidden`, `strikethrough`

### 글자 색

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`

### 밝은 글자 색

`blackBright`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

### 배경색

`bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`

### 밝은 배경색

`bgBlackBright`, `bgRedBright`, `bgGreenBright`, `bgYellowBright`, `bgBlueBright`, `bgMagentaBright`, `bgCyanBright`, `bgWhiteBright`

### 확장 색상

`ansi256(code)`, `bgAnsi256(code)`, `rgb(r, g, b)`, `bgRgb(r, g, b)`, `hex(color)`, `bgHex(color)`

## 사용법

### 가져오기

각 유틸리티는 개별 named export로 가져올 수도 있고, default export 번들로도 쓸 수 있어요. 개별 import는 트리셰이킹이 가능해서 실제로 쓴 색상만 번들에 포함돼요.

```typescript
// 개별 import (트리셰이킹 가능)
import { bold, hex, red } from 'es-toolkit/color';
// 또는 default 번들
import color from 'es-toolkit/color';

color.red('에러');
```

### 기본 색상과 스타일

색상 함수는 `string`을 받아서 ANSI 이스케이프 코드가 들어간 문자열을 돌려줘요. 이 코드를 터미널이 읽어서 색상과 스타일로 보여줘요.

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

모든 색상 함수는 `string`을 받아요. 다른 타입은 넘기기 전에 변환해 주세요.

```typescript
import { red } from 'es-toolkit/color';

red(String(42)); // '42'
red(JSON.stringify({ a: 1 }));
```

## 참고

### 환경 자동 감지는 지원하지 않아요

일반적으로 컬러 유틸은 `NO_COLOR`, `FORCE_COLOR`, `isTTY` 같은 환경 변수를 검사해서 상황에 따라 ANSI 이스케이프 코드를 출력에서 빼주기도 해요. 하지만 이런 동작이 필요한 경우는 엣지 케이스라고 판단했고, 이를 위해 모듈 로드 시점에 side effect를 발생시키거나 함수마다 분기를 계속 추가하는 걸 피하려고 자동 감지를 적용하지 않았어요.

색이 보이지 않는 출력으로 보낼 때 (예: 로그 파일에 저장)에는 최종 문자열에서 ANSI 코드를 제거하는 방향을 권장해요.
