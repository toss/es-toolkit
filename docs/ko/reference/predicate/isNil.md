# isNil

값이 `null` 또는 `undefined`인지 확인해요.

```typescript
const result = isNil(value);
```

## 사용법

### `isNil(value)`

값이 `null`이나 `undefined`인지 확인하고 싶을 때 `isNil`을 사용하세요.

```typescript
import { isNil } from 'es-toolkit/predicate';

// null 또는 undefined 값들
console.log(isNil(null)); // true
console.log(isNil(undefined)); // true

// 다른 값들
console.log(isNil(0)); // false
console.log(isNil('')); // false
console.log(isNil(false)); // false
console.log(isNil([])); // false
console.log(isNil({})); // false
```

TypeScript에서 타입 가드로도 사용할 수 있어요:

```typescript
function processValue(value: string | null | undefined) {
  if (isNil(value)) {
    // 이제 value는 null | undefined 타입으로 좁혀져요
    console.log('값이 비어있습니다');
  } else {
    // value는 string 타입으로 좁혀져요
    console.log(value.toUpperCase());
  }
}
```

#### 파라미터

- `value` (`unknown`): `null` 또는 `undefined`인지 확인할 값이에요.

#### 반환 값

(`value is null | undefined`): 값이 `null` 또는 `undefined`면 `true`, 그렇지 않으면 `false`를 반환해요.
