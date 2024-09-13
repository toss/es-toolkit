# upperFirst

문자열의 첫 글자를 대문자로 바꿔요.

## 인터페이스

```typescript
function upperFirst(str: string): string;
```

### 파라미터

- `str` (`string`): 바꿀 문자열.

### 반환 값

(`string`) 첫 글자가 대문자로 바뀐 문자열.

## 예시

```typescript
import { upperFirst } from 'es-toolkit/string';

upperFirst('fred'); // 반환 값은 'Fred'
upperFirst('Fred'); // 반환 값은 'Fred'
upperFirst('FRED'); // 반환 값은 'FRED'
```
