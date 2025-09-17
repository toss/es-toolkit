# isSymbol (Lodash 호환성)

::: warning `typeof` 연산자를 사용하세요

이 `isSymbol` 함수는 Symbol 객체 래퍼 처리로 인해 복잡해요.

대신 더 간단하고 현대적인 `typeof value === 'symbol'`을 사용하세요.

:::

값이 심볼(symbol)인지 확인해요.

```typescript
const result = isSymbol(value);
```

## 레퍼런스

### `isSymbol(value)`

값이 심볼인지 타입 안전하게 확인하고 싶을 때 `isSymbol`을 사용하세요. 원시 심볼과 Symbol 객체 래퍼 둘 다 확인해요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isSymbol } from 'es-toolkit/compat';

// 원시 심볼
isSymbol(Symbol('test')); // true
isSymbol(Symbol.for('global')); // true
isSymbol(Symbol.iterator); // true

// Symbol 객체 래퍼
isSymbol(Object(Symbol('test'))); // true

// 다른 타입들은 false
isSymbol('symbol'); // false
isSymbol(123); // false
isSymbol(true); // false
isSymbol(null); // false
isSymbol(undefined); // false
isSymbol({}); // false
isSymbol([]); // false
```

다양한 내장 심볼들도 올바르게 인식해요.

```typescript
import { isSymbol } from 'es-toolkit/compat';

// 잘 알려진 심볼들
isSymbol(Symbol.iterator); // true
isSymbol(Symbol.asyncIterator); // true
isSymbol(Symbol.toStringTag); // true
isSymbol(Symbol.hasInstance); // true
isSymbol(Symbol.toPrimitive); // true

// 전역 심볼
isSymbol(Symbol.for('myGlobalSymbol')); // true

// 사용자 정의 심볼
const mySymbol = Symbol('mySymbol');
isSymbol(mySymbol); // true
```

#### 파라미터

- `value` (`unknown`): 심볼인지 확인할 값이에요.

### 반환 값

(`value is symbol`): 값이 심볼이면 `true`, 아니면 `false`를 반환해요.
