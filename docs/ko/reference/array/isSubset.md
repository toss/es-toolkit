# isSubset

한 배열이 다른 배열의 부분집합인지 확인해요.

```typescript
const result = isSubset(superset, subset);
```

## 레퍼런스

### `isSubset(superset, subset)`

한 배열의 모든 요소가 다른 배열에 포함되는지 확인하고 싶을 때 `isSubset`을 사용하세요. 부분집합 관계를 확인할 때나 권한, 기능, 태그 등이 허용된 범위 안에 있는지 검사할 때 유용해요.

```typescript
import { isSubset } from 'es-toolkit/array';

// 숫자 배열에서 부분집합 확인
const numbers = [1, 2, 3, 4, 5];
const subset = [2, 3, 4];
isSubset(numbers, subset);
// Returns: true

// 문자열 배열에서 부분집합 확인  
const permissions = ['read', 'write', 'delete', 'admin'];
const userPermissions = ['read', 'write'];
isSubset(permissions, userPermissions);
// Returns: true

// 부분집합이 아닌 경우
const colors = ['red', 'blue', 'green'];
const invalidColors = ['red', 'yellow'];
isSubset(colors, invalidColors);
// Returns: false
```

특별한 경우들도 올바르게 처리해요.

```typescript
import { isSubset } from 'es-toolkit/array';

// 빈 배열은 항상 부분집합이에요.
const anyArray = [1, 2, 3];
const emptyArray: number[] = [];
isSubset(anyArray, emptyArray);
// Returns: true

// 같은 배열은 자기 자신의 부분집합이에요.
const same = ['a', 'b', 'c'];
isSubset(same, same);
// Returns: true

// 중복 요소가 있어도 정상 작동해요.
const withDuplicates = [1, 2, 2, 3];
const duplicateSubset = [2, 2];
isSubset(withDuplicates, duplicateSubset);
// Returns: true
```

#### 파라미터

- `superset` (`readonly T[]`): 부분집합의 모든 요소를 포함할 수 있는 상위 집합 배열이에요.
- `subset` (`readonly T[]`): 상위 집합에 포함되는지 확인할 부분집합 배열이에요.

#### 반환 값

(`boolean`): 부분집합의 모든 요소가 상위 집합에 포함되면 `true`, 그렇지 않으면 `false`를 반환해요.