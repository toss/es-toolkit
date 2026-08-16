# isNull

값이 `null`인지 확인해요.

```typescript
const result = isNull(value);
```

## 사용법

### `isNull(value)`

값이 정확히 `null`인지 확인하고 싶을 때 `isNull`을 사용하세요. 엄격한 비교(`===`)를 사용해서 `null`만 인식하고 undefined는 인식하지 않아요.

```typescript
import { isNull } from 'es-toolkit/predicate';

// null 값
console.log(isNull(null)); // true

// null이 아닌 값들
console.log(isNull(undefined)); // false
console.log(isNull(0)); // false
console.log(isNull('')); // false
console.log(isNull(false)); // false
console.log(isNull([])); // false
console.log(isNull({})); // false
```

TypeScript에서 타입 가드로도 사용할 수 있어요.

```typescript
function processValue(value: string | null | undefined) {
  if (isNull(value)) {
    // 이제 value는 null 타입으로 좁혀져요
    console.log('값이 null입니다');
  } else {
    // value는 string | undefined 타입으로 좁혀져요
    console.log('값이 null이 아닙니다:', value);
  }
}
```

`isNull`은 [`isNil`](./isNil.md)과 다르게 `undefined`를 `false`로 처리해요.

```typescript
import { isNil, isNull } from 'es-toolkit/predicate';

console.log(isNull(undefined)); // false
console.log(isNil(undefined)); // true
```

#### 파라미터

- `value` (`unknown`): `null`인지 확인할 값이에요.

#### 반환 값

(`value is null`): 값이 `null`이면 `true`, 그렇지 않으면 `false`를 반환해요.
