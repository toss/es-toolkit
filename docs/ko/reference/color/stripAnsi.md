# stripAnsi

문자열에서 모든 ANSI 색상/스타일 코드를 제거해요.

```typescript
import { color, stripAnsi } from 'es-toolkit/color';

const colored = color.red('hello');
stripAnsi(colored);
// Returns: 'hello'
```

## 사용법

### `stripAnsi(text)`

색상이 적용된 문자열에서 ANSI escape 코드를 제거하고, 순수 텍스트만 반환해요. 로그를 파일에 저장하거나 문자열 길이를 정확하게 측정할 때 유용해요.

```typescript
import { color, stripAnsi } from 'es-toolkit/color';

const message = color.bold(color.red('에러 발생'));

// 파일에 저장할 때 ANSI 코드 제거
fs.writeFileSync('log.txt', stripAnsi(message));

// 문자열 길이 측정
const visibleLength = stripAnsi(message).length;
```

기본 색상, 256색, RGB 등 이 라이브러리가 생성하는 모든 SGR(Select Graphic Rendition) 시퀀스를 제거해요.

#### 파라미터

- `text` (`string`): ANSI 코드가 포함되어 있을 수 있는 문자열이에요.

#### 반환 값

(`string`): ANSI 코드가 제거된 문자열을 반환해요.
