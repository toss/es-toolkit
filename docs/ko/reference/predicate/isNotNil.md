# isNotNil

값이 null도 undefined도 아닌지 확인해요.

```typescript
const result = isNotNil(value);
```

## 레퍼런스

### `isNotNil(value)`

값이 null이나 undefined가 아닌지 확인하고 싶을 때 `isNotNil`을 사용하세요. 배열에서 null이나 undefined 값들을 필터링할 때 특히 유용해요.

```typescript
import { isNotNil } from 'es-toolkit/predicate';

// 기본 사용예시
console.log(isNotNil(42)); // true
console.log(isNotNil('hello')); // true
console.log(isNotNil([])); // true
console.log(isNotNil({})); // true

console.log(isNotNil(null)); // false
console.log(isNotNil(undefined)); // false

// 배열 필터링에서 유용해요
const mixedArray = [1, null, 'hello', undefined, true, 0];
const filteredArray = mixedArray.filter(isNotNil);
// filteredArray는 [1, 'hello', true, 0]이 돼요 (null과 undefined 제거)
```

TypeScript에서 타입 가드로도 사용할 수 있어요:

```typescript
function processItems(items: (string | null | undefined)[]) {
  // isNotNil로 필터링하면 타입이 string[]로 좁혀져요
  const validItems = items.filter(isNotNil);
  
  validItems.forEach(item => {
    // item은 이제 string 타입으로 보장되어요
    console.log(item.toUpperCase());
  });
}
```

#### 파라미터

- `value` (`T | null | undefined`): null이나 undefined가 아닌지 확인할 값이에요.

#### 반환 값

(`value is T`): 값이 null도 undefined도 아니면 `true`, 그렇지 않으면 `false`를 반환해요.
