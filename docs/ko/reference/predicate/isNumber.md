# isNumber

주어진 값이 숫자 타입인지 확인해요.

```typescript
const result = isNumber(value);
```

## 사용법

### `isNumber(value)`

값이 숫자인지 확인하고 싶을 때 `isNumber`를 사용하세요.

```typescript
import { isNumber } from 'es-toolkit';

// 기본 숫자 값 확인
isNumber(123); // true
isNumber(3.14); // true
isNumber(NaN); // true
isNumber(Infinity); // true

// 다른 타입들과 구분
isNumber('123'); // false
isNumber(true); // false
isNumber(null); // false
isNumber(undefined); // false
```

TypeScript에서 타입 가드로 사용할 때 특히 유용해요.

```typescript
import { isNumber } from 'es-toolkit';

function processValue(value: unknown) {
  if (isNumber(value)) {
    // value는 number로 타입이 좁혀져요
    console.log(value * 2);
  } else {
    console.log('숫자가 아니에요');
  }
}
```

#### 파라미터

- `value` (`unknown`): 숫자 타입인지 확인할 값이에요.

#### 반환 값

(`value is number`): 값이 숫자이면 `true`, 그렇지 않으면 `false`를 반환해요.
