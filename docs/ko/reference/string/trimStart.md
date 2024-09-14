# trimStart

문자열의 시작 부분에 있는 공백 또는 지정된 문자를 제거해요.

## 인터페이스

```typescript
function trimStart(str: string, chars?: string | string[]): string;
```

### 파라미터

- `str` (`string`): 시작 부분에서 문자를 제거할 문자열.
- `chars` (`string | string[]`): 문자열의 시작 부분에서 제거할 문자. 기본값은 공백이에요.

### 반환 값

(`string`): 지정된 시작 문자가 제거된 후의 결과 문자열.

## 예시

```typescript
const trimmedStr1 = trimStart('---hello', '-'); // returns 'hello'
const trimmedStr2 = trimStart('000123', '0'); // returns '123'
const trimmedStr3 = trimStart('abcabcabc', 'a'); // returns 'bcabcabc'
const trimmedStr4 = trimStart('xxxtrimmed', 'x'); // returns 'trimmed'
```
