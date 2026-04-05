# createColors

색상 활성화 여부를 직접 제어할 수 있는 팩토리 함수예요.

```typescript
import { createColors } from 'es-toolkit/color';

const c = createColors(true);  // 항상 색상 활성화
const noColor = createColors(false);  // 항상 비활성화
```

## 사용법

### `createColors(enabled?)`

인자 없이 호출하면 환경을 자동 감지해요. `true`/`false`를 넘기면 강제로 활성화/비활성화해요.

```typescript
import { createColors } from 'es-toolkit/color';

// 테스트 환경에서 색상 강제 비활성화
const c = createColors(false);
c.red('hello'); // 'hello' (ANSI 코드 없이 반환)

// 로깅 라이브러리에서 색상 강제 활성화
const log = createColors(true);
log.green('성공');  // '\x1b[32m성공\x1b[39m'
```

### 언제 사용하나요?

- **테스트**: 색상을 비활성화해서 ANSI 코드 없이 순수 문자열을 비교하고 싶을 때
- **라이브러리 개발**: 사용자가 색상 옵션을 제어할 수 있게 제공할 때
- **조건부 색상**: 특정 조건에서만 색상을 적용하고 싶을 때

```typescript
import { createColors } from 'es-toolkit/color';

function createLogger(useColor: boolean) {
  const c = createColors(useColor);

  return {
    info: (msg: string) => console.log(c.blue(msg)),
    error: (msg: string) => console.error(c.red(msg)),
  };
}
```

#### 파라미터

- `enabled` (`boolean`, 선택): 색상 활성화 여부예요. 생략하면 환경을 자동 감지해요.

#### 반환 값

(`Colors`): 모든 색상, 스타일, 확장 색상 함수가 담긴 객체를 반환해요.
