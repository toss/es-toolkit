# trimEnd

문자열 끝의 공백 또는 지정된 문자를 제거해요.

`chars`가 문자열이라면, 길이가 1인 단일 문자여야 해요. 여러 문자를 제거하려면 길이가 1인 문자열의 배열을 제공하세요.

## 인터페이스

```typescript
function trimEnd(str: string, chars?: string | string[]): string;
```

### 파라미터

- `str` (`string`): 끝에서 문자를 제거할 문자열.
- `chars` (`string | string[]`): 문자열 끝에서 제거할 문자. 기본값은 공백이에요.

### 반환 값

(`string`): 끝에 공백이나 문자가 제거된 문자열.

## 예시

```typescript
const trimmedStr1 = trimEnd('hello---', '-'); // returns 'hello'
const trimmedStr2 = trimEnd('123000', '0'); // returns '123'
const trimmedStr3 = trimEnd('abcabcabc', 'c'); // returns 'abcabcab'
const trimmedStr4 = trimEnd('trimmedxxx', 'x'); // returns 'trimmed'
```
