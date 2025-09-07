# isBoolean (Lodash 호환성)

::: warning `typeof` 연산자를 사용하세요
이 `isBoolean` 함수는 Boolean 객체 래퍼 처리로 인해 복잡해요.

대신 더 간단하고 현대적인 `typeof value === 'boolean'`을 사용하세요.
:::

값이 불린(boolean) 타입인지 확인해요.

```typescript
const result = isBoolean(value);
```

## 레퍼런스

### `isBoolean(value)`

값이 불린 타입인지 타입 안전하게 확인하고 싶을 때 `isBoolean`을 사용하세요. 원시 불린 값과 Boolean 객체 래퍼 둘 다 확인해요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isBoolean } from 'es-toolkit/compat';

// 원시 불린 값
isBoolean(true); // true
isBoolean(false); // true

// Boolean 객체 래퍼
isBoolean(new Boolean(true)); // true
isBoolean(new Boolean(false)); // true

// 다른 타입들은 false
isBoolean(0); // false
isBoolean(1); // false
isBoolean('true'); // false
isBoolean('false'); // false
isBoolean(null); // false
isBoolean(undefined); // false
isBoolean({}); // false
isBoolean([]); // false
```

TypeScript에서 타입 가드로 사용할 수 있어요.

```typescript
import { isBoolean } from 'es-toolkit/compat';

function processValue(value: unknown) {
  if (isBoolean(value)) {
    // 이 블록에서 value는 boolean 타입이에요
    console.log(value ? '참' : '거짓');
  }
}
```

#### 파라미터

- `value` (`unknown`): 불린 타입인지 확인할 값이에요.

### 반환 값

(`value is boolean`): 값이 불린 타입이면 `true`, 아니면 `false`를 반환해요.
