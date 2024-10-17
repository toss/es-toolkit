# uniqueId

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

고유 ID를 생성해요. 접두사가 주어지면 ID가 추가돼요.

## 인터페이스

```typescript
function uniqueId(value?: string): string;
```

### 파라미터

- `value` (`string`, optional): ID 앞에 붙는 값.

### 반환 값

(`string`): 고유 ID 값.

## 예시

```typescript
uniqueId('contact_'); // => 'contact_104'
uniqueId(); // => '105'
```
