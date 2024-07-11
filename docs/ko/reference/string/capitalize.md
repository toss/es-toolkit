# capitalize

문자열의 첫 번째 문자를 대문자로 변환하고 나머지 문자는 소문자로 변환합니다.

## 인터페이스

```typescript
function capitalize(str: string): string;
```

### 파라미터

- `str` (`string`): 대문자로 변환할 문자열.

### 반환 값

(`string`) 대문자로 변환된 문자열.

## 예시

```typescript
import { capitalize } from 'es-toolkit/string';

capitalize('fred'); // returns 'Fred'
capitalize('FRED'); // returns 'Fred'
```
