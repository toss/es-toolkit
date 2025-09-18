# stubArray (Lodash 호환성)

::: warning 배열 리터럴 `[]`을 사용하세요

이 `stubArray` 함수는 불필요한 함수 호출로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 배열 리터럴 `[]`을 사용하세요.

:::

항상 새로운 빈 배열을 반환해요.

```typescript
const emptyArray = stubArray();
```

## 레퍼런스

### `stubArray()`

매번 새로운 빈 배열이 필요할 때 `stubArray`를 사용하세요. 기본값으로 빈 배열을 제공하거나 콜백 함수에서 일관된 빈 배열을 반환할 때 유용해요.

```typescript
import { stubArray } from 'es-toolkit/compat';

// 기본값으로 빈 배열 제공
function processItems(items = stubArray()) {
  return items.map(item => item.toUpperCase());
}

processItems(); // []
processItems(['a', 'b']); // ['A', 'B']
```

콜백 함수에서 일관된 빈 배열을 반환할 때도 사용할 수 있어요.

```typescript
import { stubArray } from 'es-toolkit/compat';

// 필터링 후 빈 결과를 위한 기본값
const getItems = (condition: boolean) => {
  return condition ? ['item1', 'item2'] : stubArray();
};

getItems(true); // ['item1', 'item2']
getItems(false); // []
```

#### 파라미터

없음.

### 반환 값

(`[]`): 새로운 빈 배열을 반환해요.
