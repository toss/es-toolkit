# hasValue (`Map`)

Map이 특정 값을 포함하는지 확인해요.

```typescript
const exists = hasValue(map, searchElement);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/map`에서만 사용할 수 있어요.

:::

## 사용법

### `hasValue(map, searchElement)`

Map이 특정 값을 포함하는지 확인하고 싶을 때 `hasValue`를 사용하세요. 이 함수는 SameValueZero 비교 방식을 사용해요 (Array.prototype.includes와 유사). 즉, NaN은 NaN과 같다고 간주해요.

```typescript
import { hasValue } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = hasValue(map, 2);
// 결과: true

const result2 = hasValue(map, 5);
// 결과: false
```

다양한 값 타입을 검색할 수 있어요.

```typescript
import { hasValue } from 'es-toolkit/map';

// NaN 검색 (SameValueZero 비교 사용)
const numbers = new Map([
  ['a', 1],
  ['b', NaN],
  ['c', 3],
]);

const hasNaN = hasValue(numbers, NaN);
// 결과: true

// 객체 검색 (참조 동등성)
const obj = { id: 1 };
const objects = new Map([
  ['first', obj],
  ['second', { id: 2 }],
]);

const hasObj = hasValue(objects, obj);
// 결과: true

const hasSimilar = hasValue(objects, { id: 1 });
// 결과: false (다른 참조)
```

#### 파라미터

- `map` (`Map<K, V>`): 검색할 Map이에요.
- `searchElement` (`V`): 검색할 값이에요.

#### 반환 값

(`boolean`): Map이 값을 포함하면 true를, 그렇지 않으면 false를 반환해요.
