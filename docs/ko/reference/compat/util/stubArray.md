# stubArray (Lodash 호환성)

::: warning `[]`를 직접 사용하세요

이 `stubArray` 함수는 단순히 빈 배열을 반환하는 래퍼 함수로 불필요한 추상화예요.

대신 더 빠르고 직접적인 `[]`를 사용하세요.

:::

항상 새로운 빈 배열을 반환해요.

```typescript
const emptyArray = stubArray();
```

## 레퍼런스

### `stubArray()`

항상 새로운 빈 배열을 반환하는 함수예요. 기본값으로 빈 배열이 필요하거나 함수형 프로그래밍에서 일관된 반환값이 필요할 때 사용해요.

```typescript
import { stubArray } from 'es-toolkit/compat';

// 빈 배열을 반환해요
const emptyArray = stubArray();
console.log(emptyArray); // => []

// 배열 메서드에서 기본값으로 사용해요
const items = [1, 2, 3];
const result = items.filter(x => x > 5) || stubArray();
console.log(result); // => []

// 함수형 프로그래밍에서 사용해요
const getData = () => stubArray();
const data = getData();
data.push('item'); // 새로운 배열이므로 안전해요
```

매번 새로운 배열 인스턴스를 반환해요.

```typescript
import { stubArray } from 'es-toolkit/compat';

const arr1 = stubArray();
const arr2 = stubArray();

console.log(arr1 === arr2); // => false (다른 인스턴스)
console.log(Array.isArray(arr1)); // => true
console.log(arr1.length); // => 0
```

#### 파라미터

파라미터는 없어요.

### 반환 값

(`any[]`): 새로운 빈 배열을 반환해요.
