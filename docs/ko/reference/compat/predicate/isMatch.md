# isMatch (Lodash 호환성)

객체가 다른 객체의 모양과 값에 부분적으로 일치하는지 확인해요.

```typescript
const result = isMatch(target, source);
```

## 레퍼런스

### `isMatch(target, source)`

객체나 배열이 다른 객체의 구조와 값에 부분적으로 일치하는지 확인할 때 `isMatch`를 사용하세요. 전체가 동일할 필요는 없고, source의 모든 프로퍼티가 target에 존재하고 같은 값을 가지면 되요.

```typescript
import { isMatch } from 'es-toolkit/compat';

// 객체 부분 일치
isMatch({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 }); // true (a, b가 일치)
isMatch({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 }); // false (c가 target에 없음)

// 중첩 객체
isMatch({ user: { name: 'Alice', age: 25, city: 'Seoul' } }, { user: { name: 'Alice', age: 25 } }); // true

// 배열 부분 일치 (순서 무관)
isMatch([1, 2, 3, 4], [2, 4]); // true (2와 4가 배열에 있음)
isMatch([1, 2, 3], [1, 2, 3]); // true (완전 일치)
isMatch([1, 2], [1, 2, 3]); // false (3이 target에 없음)

// Map 부분 일치
const targetMap = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);
const sourceMap = new Map([
  ['a', 1],
  ['b', 2],
]);
isMatch(targetMap, sourceMap); // true

// Set 부분 일치
const targetSet = new Set([1, 2, 3, 4]);
const sourceSet = new Set([2, 4]);
isMatch(targetSet, sourceSet); // true

// 빈 source는 항상 true
isMatch({ a: 1 }, {}); // true
isMatch([1, 2, 3], []); // true
```

더 직접적이고 빠른 방법들:

```typescript
// 완전 동등성 확인 (더 빠름)
import { isEqual } from 'es-toolkit';

isEqual(obj1, obj2);

// 특정 프로퍼티 확인 (더 명확함)
target.a === source.a && target.b === source.b;

// 객체 구조 확인
Object.keys(source).every(key => target[key] === source[key]);
```

#### 파라미터

- `target` (`unknown`): 일치하는지 확인할 객체예요.
- `source` (`unknown`): 일치 패턴이 되는 객체예요.

### 반환 값

(`boolean`): target이 source의 모양과 값에 부분적으로 일치하면 `true`, 아니면 `false`를 반환해요.
