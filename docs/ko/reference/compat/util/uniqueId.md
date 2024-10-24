# uniqueId

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

고유한 문자열 식별자를 생성해요. 앞에 붙일 접두사 문자열를 선택적으로 지정할 수 있어요.

## 인터페이스

```typescript
function uniqueId(prefix?: string): string;
```

### 파라미터

- `prefix` (`string`, optional): ID 앞에 붙는 접두사 문자열.

### 반환 값

(`string`): 고유 식별자 문자열.

## 예시

```typescript
uniqueId('contact_'); // => 'contact_104'
uniqueId(); // => '105'
```
