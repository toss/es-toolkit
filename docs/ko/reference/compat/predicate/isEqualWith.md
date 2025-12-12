# isEqualWith (Lodash 호환성)

::: warning es-toolkit의 [isEqualWith](../../predicate/isEqualWith.md)를 사용하세요
이 `isEqualWith` 함수는 Lodash 호환성을 위한 복잡한 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [isEqualWith](../../predicate/isEqualWith.md)를 사용하세요.
:::

사용자 정의 비교 함수를 사용해서 두 값이 같은지 확인해요.

```typescript
const result = isEqualWith(a, b, customizer);
```

## 사용법

### `isEqualWith(a, b, areValuesEqual?)`

사용자 정의 비교 함수를 사용해서 두 값을 깊게 비교해요. 사용자 정의 함수가 불린 값을 반환하면 그 결과를 사용하고, `undefined`를 반환하면 기본 동등성 비교를 사용해요.

사용자 정의 비교 함수는 객체, 배열, Map, Set 등의 복잡한 구조 내부의 값들을 비교할 때도 사용되어서 깊은 비교를 보장해요.

```typescript
import { isEqualWith } from 'es-toolkit/compat';

// 대소문자 무시하는 문자열 비교
const customizer = (a: any, b: any) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};

isEqualWith('Hello', 'hello', customizer); // true
isEqualWith({ a: 'Hello' }, { a: 'hello' }, customizer); // true

// 숫자의 절댓값으로 비교
const absCustomizer = (a: any, b: any) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a) === Math.abs(b);
  }
};

isEqualWith([-1, 2], [1, -2], absCustomizer); // true

// 복잡한 객체 비교
const obj1 = {
  name: 'JOHN',
  details: { age: 30, city: 'NYC' },
};
const obj2 = {
  name: 'john',
  details: { age: 30, city: 'nyc' },
};

isEqualWith(obj1, obj2, customizer); // true
```

Map과 Set에 대해서는 특별한 처리를 해요.

```typescript
import { isEqualWith } from 'es-toolkit/compat';

const customizer = (a: any, b: any) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};

const map1 = new Map([['KEY', 'value']]);
const map2 = new Map([['key', 'value']]);
isEqualWith(map1, map2, customizer); // true

const set1 = new Set(['HELLO']);
const set2 = new Set(['hello']);
isEqualWith(set1, set2, customizer); // true
```

#### 파라미터

- `a` (`any`): 비교할 첫 번째 값이에요.
- `b` (`any`): 비교할 두 번째 값이에요.
- `areValuesEqual` (`(x: any, y: any, property?: PropertyKey, xParent?: any, yParent?: any, stack?: Map<any, any>) => boolean | void`): 사용자 정의 비교 함수예요.
  - `x`: 첫 번째 객체 `a`에서 온 값
  - `y`: 두 번째 객체 `b`에서 온 값
  - `property`: `x`와 `y`를 가져올 때 사용한 속성 키
  - `xParent`: 첫 번째 값 `x`의 부모 객체
  - `yParent`: 두 번째 값 `y`의 부모 객체
  - `stack`: 순환 참조를 처리하는 내부 스택 (Map)

#### 반환 값

(`boolean`): 사용자 정의 함수에 따라 두 값이 같으면 `true`, 다르면 `false`를 반환해요.
