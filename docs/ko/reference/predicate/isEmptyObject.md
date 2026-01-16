# isEmptyObject

속성이 하나도 없는 일반 객체(`{}`)인지 확인해요.

```typescript
const result = isEmptyObject(value);
```

## 사용법

### `isEmptyObject(value)`

`{}`처럼 속성이 하나도 없는 일반 객체인지 확인하고 싶을 때 `isEmptyObject`를 사용하세요. 배열, Map, Set 같은 다른 객체 타입은 `false`를 반환해요.

```typescript
import { isEmptyObject } from 'es-toolkit';

// 속성이 없는 일반 객체
isEmptyObject({}); // true
isEmptyObject(new Object()); // true
isEmptyObject(Object.create(null)); // true

// 속성이 있는 객체
isEmptyObject({ a: 1 }); // false
isEmptyObject({ key: 'value' }); // false

// 일반 객체가 아닌 타입들
isEmptyObject([]); // false (배열)
isEmptyObject(null); // false
isEmptyObject(new Map()); // false
isEmptyObject(new Set()); // false
```

#### 파라미터

- `value` (`unknown`): 확인할 값이에요.

#### 반환 값

(`value is Record<PropertyKey, never>`): 속성이 없는 일반 객체이면 `true`, 그렇지 않으면 `false`를 반환해요.
