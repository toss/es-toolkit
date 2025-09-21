# over (Lodash 호환성)

::: warning 배열 메서드를 직접 사용하세요

이 `over` 함수는 함수들을 배열로 매핑하는 과정에서 추가적인 오버헤드가 발생해요.

대신 더 빠르고 현대적인 배열의 `map` 메서드를 사용하세요.

:::

주어진 함수들에 동일한 인자를 전달하여 각각의 결과를 배열로 반환하는 함수를 만들어요.

```typescript
const multiCall = over(funcs);
```

## 레퍼런스

### `over(...iteratees)`

여러 함수를 받아서 동일한 인자로 각각 호출하고 결과를 배열로 반환하는 함수를 생성해요. 동일한 데이터로 여러 계산을 수행할 때 유용해요.

```typescript
import { over } from 'es-toolkit/compat';

// 수학 함수들을 함께 사용해요
const mathOperations = over([Math.max, Math.min]);
mathOperations(1, 2, 3, 4);
// => [4, 1]

// 개별 함수로 전달할 수도 있어요
const operations = over(Math.max, Math.min);
operations(1, 2, 3, 4);
// => [4, 1]

// 객체 속성을 추출해요
const getProperties = over(['name', 'age']);
getProperties({ name: 'John', age: 30 });
// => ['John', 30]

// 조건을 검사해요
const validators = over([
  { name: 'John' },  // 객체 매칭
  { age: 30 }
]);
validators({ name: 'John', age: 30 });
// => [true, true]
```

중첩 경로도 처리할 수 있어요.

```typescript
import { over } from 'es-toolkit/compat';

const data = {
  user: { name: 'John', profile: { age: 30 } },
  settings: { theme: 'dark' }
};

const getInfo = over(['user.name', 'user.profile.age', 'settings.theme']);
getInfo(data);
// => ['John', 30, 'dark']
```

#### 파라미터

- `...iteratees` (`Array<Function | string | object | Array>`): 호출할 함수들이나 속성 경로들이에요. 배열로 전달하거나 개별 인자로 전달할 수 있어요.

### 반환 값

(`(...args: any[]) => any[]`): 인자를 받아서 각 함수의 결과를 배열로 반환하는 함수를 반환해요.