# isLength

값이 유효한 배열 길이인지 확인해요.

```typescript
const result = isLength(value);
```

## 레퍼런스

### `isLength(value)`

값이 유효한 배열 길이인지 확인하고 싶을 때 `isLength`를 사용하세요. 유효한 길이는 0 이상이고 `Number.MAX_SAFE_INTEGER` 이하인 정수여야 해요.

```typescript
import { isLength } from 'es-toolkit/predicate';

// 유효한 길이들
console.log(isLength(0)); // true
console.log(isLength(42)); // true
console.log(isLength(Number.MAX_SAFE_INTEGER)); // true

// 무효한 길이들
console.log(isLength(-1)); // false (음수)
console.log(isLength(1.5)); // false (소수)
console.log(isLength(Number.MAX_SAFE_INTEGER + 1)); // false (안전하지 않은 정수)
console.log(isLength('42')); // false (문자열)
console.log(isLength(null)); // false (null)
```

TypeScript에서 타입 가드로도 사용할 수 있어요:

```typescript
function processLength(value: unknown) {
  if (isLength(value)) {
    // 이제 value는 number 타입으로 좁혀져요
    console.log(value.toFixed(2));
  }
}
```

#### 파라미터

- `value` (`unknown`): 유효한 길이인지 확인할 값이에요.

#### 반환 값

(`value is number`): 값이 유효한 길이면 `true`, 그렇지 않으면 `false`를 반환해요.
