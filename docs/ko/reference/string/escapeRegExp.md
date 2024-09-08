# escapeRegExp

정규식 특수 문자 "^", "$", "\\", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", 그리고 "|"을 `str`에서 이스케이프-예요.


## 인터페이스

```typescript
function escapeRegExp(str: string): string;
```

### 파라미터

- `str` (`string`) 이스케이프할 문자열-이에요.

### 반환 값

(`string`): 이스케이프된 문자열을 반환해요.