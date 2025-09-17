# uniqueId (Lodash 호환성)

::: warning crypto.randomUUID 사용 권장

고유한 식별자를 생성할 때는 crypto.randomUUID()를 사용하는 것이 더 안전하고 표준적인 방식이에요.

대신 더 빠르고 현대적인 crypto.randomUUID()를 사용하세요.

:::

고유한 문자열 식별자를 생성해요. 앞에 붙일 접두사 문자열를 선택적으로 지정할 수 있어요.

```typescript
uniqueId('contact_'); // => 'contact_104'
uniqueId(); // => '105'
```

## 레퍼런스

### `uniqueId(prefix?: string): string`

고유한 문자열 식별자를 생성해요.

#### 파라미터

- `prefix` (`string`, optional): ID 앞에 붙는 접두사 문자열

### 반환 값

(`string`): 고유 식별자 문자열
