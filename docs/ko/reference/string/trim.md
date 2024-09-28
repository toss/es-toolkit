# trim

문자열의 앞뒤에 있는 공백 또는 지정된 문자를 제거해요.

## 인터페이스

```typescript
function trim(str: string, chars?: string | string[]): string;
```

### 파라미터

- `str` (`string`): 양옆에서 문자를 제거할 문자열.
- `chars` (`string | string[]`): 문자열에서 제거할 문자예요. 단일 문자 또는 문자 배열일 수 있어요. 기본값은 공백이에요.

### 반환 값

(`string`): 지정된 문자가 제거된 후의 결과 문자열입니다요.

## 예시

```typescript
trim('  hello  '); // "hello"
trim('--hello--', '-'); // "hello"
trim('##hello##', ['#', 'o']); // "hell"
```
