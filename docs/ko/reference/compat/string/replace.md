# replace

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

문자열에서 일치하는 패턴을 다른 문자열로 바꿔요.

## 인터페이스

```typescript
function replace(
  target: string,
  pattern: string | RegExp,
  replacement: string | ((substring: string, ...args: any[]) => string)
): string;
```

### 파라미터

- `target` (`string`): 대상 문자열.
- `pattern` (`string | RegExp`): 일치시킬 패턴.
- `replacement` (`string | ((substring: string, ...args: any[]) => string)`): 교체 문자열 또는 교체 문자열을 반환하는 함수.

### 반환 값

(`string`): 일치한 패턴이 대체된 새로운 문자열.

## 예시

```typescript
replace('abcde', 'de', '123'); // 'abc123'
replace('abcde', /[bd]/g, '-'); // 'a-c-e'
replace('abcde', 'de', substring => substring.toUpperCase()); // 'abcDE'
replace('abcde', /[bd]/g, substring => substring.toUpperCase()); // 'aBcDe'
```
