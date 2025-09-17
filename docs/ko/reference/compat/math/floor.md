# floor (Lodash 호환성)

::: warning `Math.floor`을 사용하세요

이 `floor` 함수는 소수점 자리 계산과 내부 함수 호출로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Math.floor`을 사용하세요.

:::

숫자를 지정된 소수점 자리로 내림해요.

```typescript
const result = floor(number, precision);
```

## 레퍼런스

### `floor(number, precision?)`

숫자를 특정 소수점 자리로 내림하고 싶을 때 `floor`를 사용하세요.

```typescript
import { floor } from 'es-toolkit/compat';

// 기본 내림 (정수로)
floor(4.9);
// Returns: 4

floor(4.1);
// Returns: 4

// 소수점 둘째 자리로 내림
floor(6.994, 2);
// Returns: 6.99

floor(6.999, 2);
// Returns: 6.99

// 음수 자리로 내림 (10의 단위)
floor(6040, -2);
// Returns: 6000

floor(1234, -2);
// Returns: 1200

// 음수도 내림
floor(-4.1);
// Returns: -5

floor(-6.994, 2);
// Returns: -7.00
```

#### 파라미터

- `number` (`number`): 내림할 숫자예요.
- `precision` (`number`, 선택): 내림할 소수점 자리수예요. 기본값은 `0`이에요.

### 반환 값

(`number`): 지정된 소수점 자리로 내림된 숫자를 반환해요.