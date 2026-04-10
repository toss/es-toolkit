# stripColor

문자열에서 ANSI 색상/스타일 코드를 제거해요.

```typescript
import { color, stripColor } from 'es-toolkit/color';

const colored = color.red('hello');
stripColor(colored);
// Returns: 'hello'
```

## 사용법

### `stripColor(text)`

색상이 적용된 문자열에서 ANSI escape 코드를 제거하고, 순수 텍스트만 반환해요. 로그를 파일에 저장하거나 문자열 길이를 정확하게 측정할 때 유용해요.

```typescript
import { color, stripColor } from 'es-toolkit/color';

const message = color.bold(color.red('에러 발생'));

// 파일에 저장할 때 ANSI 코드 제거
fs.writeFileSync('log.txt', stripColor(message));

// 문자열 길이 측정
const visibleLength = stripColor(message).length;
```

기본 색상, 256색, RGB 등 이 라이브러리가 생성하는 SGR(Select Graphic Rendition) 시퀀스만 제거해요. 커서 이동, OSC 하이퍼링크 등 다른 ANSI 시퀀스는 제거하지 않아요.

#### 파라미터

- `text` (`string`): ANSI 코드가 포함되어 있을 수 있는 문자열이에요.

#### 반환 값

(`string`): ANSI 코드가 제거된 문자열을 반환해요.
