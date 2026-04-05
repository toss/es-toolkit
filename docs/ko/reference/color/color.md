# color

터미널 출력에 색상과 스타일을 적용하는 객체예요. 환경에 따라 색상 지원 여부를 자동으로 감지해요.

```typescript
import { color } from 'es-toolkit/color';

color.red('에러가 발생했어요');
```

## 왜 es-toolkit/color인가요?

기존 색상 라이브러리(picocolors 등)의 알려진 문제들을 해결했어요.

- **`FORCE_COLOR=0` 버그 수정**: picocolors는 `"0"`을 truthy로 처리해서 색상이 켜져요. es-toolkit은 스펙(force-color.org)에 따라 올바르게 비활성화해요.
- **안전한 `process` 접근**: Cloudflare Workers 같이 `process`가 없는 환경에서도 크래시 없이 동작해요.
- **CI 파이프 출력 처리**: stdout이 TTY가 아닌 경우 (파이프, 리다이렉트) 색상을 비활성화해요. picocolors는 CI 환경에서 이를 무시해요.
- **FORCE_COLOR/NO_COLOR 스펙 준수**: 빈 문자열을 "not set"으로 올바르게 처리해요.
- **확장 색상 지원**: 256색, RGB, Hex 색상을 지원해요. picocolors는 기본 16색만 지원해요.
- **`stripAnsi` 내장**: ANSI 코드를 제거하는 유틸리티를 별도 패키지 없이 제공해요.
- **배경색 멀티라인 처리**: 줄바꿈에서 배경색이 깨지지 않아요.
- **TypeScript 지원**: 완전한 타입 정의를 제공해요.
- **ESM/CJS 듀얼**: Named export와 CommonJS 모두 지원해요.

## 사용법

### 기본 색상과 스타일

```typescript
import { color } from 'es-toolkit/color';

// 전경색
color.red('빨간 텍스트');
color.green('초록 텍스트');
color.blue('파란 텍스트');
color.yellow('노란 텍스트');

// 스타일
color.bold('굵은 텍스트');
color.dim('흐린 텍스트');
color.italic('기울임 텍스트');
color.underline('밑줄 텍스트');
color.strikethrough('취소선 텍스트');

// 배경색
color.bgRed('빨간 배경');
color.bgGreen('초록 배경');
```

### 합성

여러 스타일을 중첩해서 사용할 수 있어요.

```typescript
import { color } from 'es-toolkit/color';

color.bold(color.red('굵은 빨간 텍스트'));
color.bgYellow(color.black('노란 배경에 검정 텍스트'));
```

### 확장 색상

256색, RGB, Hex 색상을 사용할 수 있어요. 커링 방식으로, 색상 값을 먼저 넘기고 텍스트를 이후에 넘겨요.

```typescript
import { color } from 'es-toolkit/color';

// 256색 팔레트
color.ansi256(196)('밝은 빨강');
color.bgAnsi256(21)('파란 배경');

// RGB
color.rgb(255, 128, 0)('주황색');
color.bgRgb(0, 255, 0)('초록 배경');

// Hex
color.hex('#ff00ff')('마젠타');
color.bgHex('#00ff00')('초록 배경');

// 짧은 Hex (#RGB)
color.hex('#f0f')('마젠타');
```

### 입력 타입

모든 색상 함수는 어떤 타입이든 받아서 `String()`으로 변환해요. chalk에서 마이그레이션할 때 타입 에러 없이 사용할 수 있어요.

```typescript
color.red(123); // '123' (숫자)
color.red(true); // 'true' (불리언)
color.red(null); // 'null'
color.red(undefined); // 'undefined'
```

## 사용 가능한 스타일

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
