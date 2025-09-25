# isEqualWith

사용자 정의 비교 함수를 사용해서 두 값이 동일한지 확인해요.

```typescript
const result = isEqualWith(a, b, areValuesEqual);
```

## 레퍼런스

### `isEqualWith(a, b, areValuesEqual)`

특별한 비교 로직이 필요할 때 `isEqualWith`를 사용하세요. 사용자 정의 함수가 `true`나 `false`를 반환하면 그 결과를 사용하고, `undefined`를 반환하면 기본 비교 방식을 사용해요. 대소문자 무시, 특정 속성 제외, 근사값 비교 등에 유용해요.

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

// 대소문자 구분하지 않는 문자열 비교
const caseInsensitiveCompare = (a, b) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};

isEqualWith('Hello', 'hello', caseInsensitiveCompare); // true
isEqualWith({ name: 'Alice' }, { name: 'ALICE' }, caseInsensitiveCompare); // true
```

숫자의 근사값 비교에도 활용할 수 있어요.

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

// 부동소수점 오차 허용 비교
const approximateCompare = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a - b) < 0.01; // 0.01 이하의 차이는 동일하게 처리
  }
};

isEqualWith(0.1 + 0.2, 0.3, approximateCompare); // true
isEqualWith({ price: 10.01 }, { price: 10.02 }, approximateCompare); // true
```

특정 속성을 무시하고 비교하고 싶을 때도 유용해요.

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

// 특정 프로퍼티 무시하고 비교
const ignoreTimestamp = (a, b, property) => {
  if (property === 'timestamp') {
    return true; // timestamp 프로퍼티는 항상 같다고 처리
  }
};

const obj1 = { id: 1, name: 'Test', timestamp: 1000 };
const obj2 = { id: 1, name: 'Test', timestamp: 2000 };
isEqualWith(obj1, obj2, ignoreTimestamp); // true
```

복잡한 사용자 정의 비교 로직도 구현할 수 있어요.

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

const areValuesEqual = (a, b, property) => {
  // ID는 무시
  if (property === 'id') {
    return true;
  }

  // 이름은 대소문자 구분 없이 비교
  if (property === 'name' && typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }

  // 나머지는 기본 비교 방식 사용
  return undefined;
};

const user1 = { id: 1, name: 'Alice', age: 25 };
const user2 = { id: 999, name: 'ALICE', age: 25 };
isEqualWith(user1, user2, areValuesEqual); // true
```

#### 파라미터

- `a` (`unknown`): 비교할 첫 번째 값이에요.
- `b` (`unknown`): 비교할 두 번째 값이에요.
- `areValuesEqual` (`(x: any, y: any, property?: PropertyKey, xParent?: any, yParent?: any, stack?: Map<any, any>) => boolean | void`): 사용자 정의 비교 함수예요. `true`나 `false`를 반환하면 그 결과를 사용하고, `undefined`를 반환하면 기본 비교 방식을 사용해요.

#### 반환 값

(`boolean`): 사용자 정의 기준에 따라 두 값이 동일하면 `true`, 그렇지 않으면 `false`를 반환해요.
