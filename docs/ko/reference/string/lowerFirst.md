# lowerFirst

문자열의 첫 글자를 소문자로 바꿔요.

## 인터페이스

```typescript
function lowerFirst(str: string): string;
```

### 파라미터

- `str` (`string`): 바꿀 문자열.

### 반환 값

(`string`) 첫 글자가 소문자로 바뀐 문자열.

## 예시

```typescript
import { lowerFirst } from 'es-toolkit/string';

lowerFirst('fred'); // 반환 값은 'fred'
lowerFirst('Fred'); // 반환 값은 'fred'
lowerFirst('FRED'); // 반환 값은 'fRED'
```
