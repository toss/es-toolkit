# escapeRegExp

정규식 특수 문자 `"^"`, `"$"`, `"\\"`, `"."`, `"\*"`, `"+"`, `"?"`, `"("`, `")"`, `"["`, `"]"`, `"{"`, `"}"`, `"|"`를 `str`에서 이스케이프해요.

## 인터페이스

```typescript
function escapeRegExp(str: string): string;
```

### 파라미터

- `str` (`string`) 이스케이프할 문자열이에요.

### 반환 값

(`string`): 이스케이프된 문자열을 반환해요.

## 예시

```typescript
import { escapeRegExp } from 'es-toolkit/string';

escapeRegExp('[es-toolkit](https://es-toolkit.slash.page/)'); // returns '\[es-toolkit\]\(https://es-toolkit\.slash\.page/\)'
```
