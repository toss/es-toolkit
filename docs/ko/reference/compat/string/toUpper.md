# toUpper

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 값을 문자열로 변환한 후, 대문자로 변환해요. 다양한 타입의 입력 값을 처리하며, 먼저 문자열로 변환한 다음 작업을 수행해요.

## 인터페이스

```typescript
function toUpper(value?: unknown): string;
```

### 파라미터

- `value` (`unknown`): 대문자로 변환할 값. 생략하면 빈 문자열을 반환해요.

### 반환 값

`string`: 입력 값을 문자열로 변환한 후 대문자로 변환한 결과.

## 예시

```typescript
import { toUpper } from 'es-toolkit/compat';

toUpper('--foo-bar--'); // '--FOO-BAR--' 반환
toUpper('Hello World'); // 'HELLO WORLD' 반환
toUpper(null); // '' 반환
toUpper([1, 2, 3]); // '1,2,3' 반환
toUpper(123); // '123' 반환
toUpper(); // '' 반환
```
