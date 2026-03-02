# conformsTo (Lodash 호환성)

객체가 주어진 조건 함수들을 모두 만족하는지 확인해요.

```typescript
const result = conformsTo(target, source);
```

## 사용법

### `conformsTo(target, source)`

객체의 프로퍼티들이 지정된 조건들을 모두 만족하는지 확인할 때 `conformsTo`를 사용하세요. 각 프로퍼티에 대해 해당 조건 함수를 적용해서 결과를 확인해요.

```typescript
import { conformsTo } from 'es-toolkit/compat';

// 기본 사용법
const object = { a: 1, b: 2 };
const conditions = {
  a: n => n > 0,
  b: n => n > 1,
};

conformsTo(object, conditions); // true (모든 조건 만족)

// 다양한 조건들
const user = { name: 'Alice', age: 25, active: true };
const userValidation = {
  name: s => typeof s === 'string' && s.length > 0,
  age: n => typeof n === 'number' && n >= 18,
  active: b => typeof b === 'boolean',
};

conformsTo(user, userValidation); // true

// 조건을 만족하지 않는 경우
const invalidUser = { name: '', age: 15, active: 'yes' };
conformsTo(invalidUser, userValidation); // false

// 부분적인 조건 확인
const partialConditions = {
  age: n => n >= 21,
};
conformsTo(user, partialConditions); // true (age만 확인)

// 프로퍼티가 없는 경우
const incompleteObject = { a: 1 }; // b 프로퍼티 없음
const strictConditions = {
  a: n => n > 0,
  b: n => n > 0,
};
conformsTo(incompleteObject, strictConditions); // false (b 프로퍼티가 없음)
```

#### 파라미터

- `target` (`Record<PropertyKey, any>`): 검사할 객체예요.
- `source` (`Record<PropertyKey, (value: any) => boolean>`): 프로퍼티별 조건 함수들을 가진 객체예요.

#### 반환 값

(`boolean`): 객체가 모든 조건을 만족하면 `true`, 아니면 `false`를 반환해요.
