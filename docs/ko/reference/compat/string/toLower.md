# toLower

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 값을 문자열로 변환하고 소문자로 변환해요. 주어진 인자는 먼저 문자열로 변환돼서 처리돼요.

## 인터페이스

```typescript
function toLower(value?: unknown): string;
```

### 파라미터

- `value` (`unknown`): 변환할 값.

### 반환 값

(`string`): 소문자로 변환된 문자열.

## 예시

```typescript
toLower('--FOO-BAR--');
// => '--foo-bar--'

toLower(null);
// => ''

toLower([1, 2, 3]);
// => '1,2,3'
```
