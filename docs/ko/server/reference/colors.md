# colors

ANSI 이스케이프 코드로 텍스트를 감싸 터미널에 색상과 스타일을 입혀요.

```typescript
import { colors } from 'es-toolkit/server';

console.log(colors.red('error'));
console.log(colors.bold(colors.cyan('hello')));
```

## 사용법

`colors`는 ANSI 스타일 함수들을 모아 둔 객체예요. 각 함수는 문자열을 받아서 알맞은 열기/닫기 코드를 감싼 문자열을 반환해요.

```typescript
import { colors } from 'es-toolkit/server';

colors.red('error');
colors.bold('emphasized');
colors.underline(colors.cyan('link'));
```

실제로 참조한 스타일만 번들에 포함되기 때문에 트리 셰이킹에 유리해요.

### 수식자

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

확장 색상 함수들은 커링 형태예요. 색상 값을 먼저 넘기고, 그다음에 텍스트를 넘겨요.

- `ansi256(code)` / `bgAnsi256(code)`: 8비트(256색) 팔레트. `code`는 `0–255` 사이의 값이에요.
- `rgb(r, g, b)` / `bgRgb(r, g, b)`: 24비트 트루컬러.
- `hex(color)` / `bgHex(color)`: 24비트 트루컬러를 `#RGB`, `#RRGGBB` 또는 `#`을 뺀 같은 형식으로 받아요.

```typescript
import { colors } from 'es-toolkit/server';

const orange = colors.rgb(255, 99, 71);
console.log(orange('hello'));

console.log(colors.hex('#f06')('hello'));
console.log(colors.bgAnsi256(21)('hello'));
```

### 조합

스타일을 중첩해서 호출하면, 안쪽 스타일이 닫힌 뒤에도 바깥 스타일을 다시 열어 줘서 색이 유지돼요.

```typescript
import { colors } from 'es-toolkit/server';

console.log(colors.red(`error: ${colors.underline('not found')}, please retry`));
```

대부분의 터미널은 줄바꿈마다 배경색을 초기화하기 때문에, 배경색 함수는 줄바꿈을 만나면 배경 코드를 다시 열어 줘요.

```typescript
import { colors } from 'es-toolkit/server';

console.log(colors.bgYellow('line one\nline two'));
```

## 타입

스타일 함수를 반환하는 헬퍼(`ansi256`, `bgAnsi256`, `rgb`, `bgRgb`, `hex`, `bgHex`)는 `ColorFunction`을 반환해요.

```typescript
import type { ColorFunction } from 'es-toolkit/server';

type ColorFunction = (text: string) => string;
```

## 참고

`colors`는 터미널이 색상을 지원하는지 따로 감지하지 않아요. 어떤 환경이든 항상 ANSI 이스케이프 코드를 출력해요. `NO_COLOR`, `FORCE_COLOR`, TTY 여부, CI 환경 등에 따라 출력을 분기하고 싶다면 호출하기 전에 직접 환경을 확인해 주세요.
