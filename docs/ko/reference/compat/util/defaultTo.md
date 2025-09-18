# defaultTo (Lodash 호환성)

::: warning nullish coalescing 연산자(`??`)와 NaN 확인을 사용하세요

이 `defaultTo` 함수는 단순한 null 체크를 위해 추가적인 함수 호출 오버헤드가 발생해요.

대신 더 빠르고 현대적인 nullish coalescing 연산자(`??`)와 `Number.isNaN()`을 조합해서 사용하세요.

:::

`null`, `undefined`, `NaN`인 값에 대해서 기본값을 반환해요.

```typescript
const result = defaultTo(value, defaultValue);
```

## 레퍼런스

### `defaultTo(value, defaultValue)`

값이 `null`, `undefined`, 또는 `NaN`일 때 기본값을 제공하고 싶을 때 `defaultTo`를 사용하세요. API 응답이나 사용자 입력에서 유효하지 않은 값을 처리할 때 유용해요.

```typescript
import { defaultTo } from 'es-toolkit/compat';

// 기본 사용법
console.log(defaultTo(null, 'default')); // 'default'
console.log(defaultTo(undefined, 'default')); // 'default'
console.log(defaultTo(NaN, 0)); // 0
console.log(defaultTo('actual', 'default')); // 'actual'
console.log(defaultTo(123, 0)); // 123
```

API 응답 처리에 활용할 수 있어요:

```typescript
import { defaultTo } from 'es-toolkit/compat';

function processUserData(response) {
  return {
    name: defaultTo(response.name, '이름 없음'),
    age: defaultTo(response.age, 0),
    score: defaultTo(response.score, 0) // NaN 처리 포함
  };
}

// API가 불완전한 데이터를 반환하는 경우
const userData = processUserData({
  name: null,
  age: undefined,
  score: NaN
});

console.log(userData);
// { name: '이름 없음', age: 0, score: 0 }
```

nullish coalescing 연산자와 비교:

```typescript
// defaultTo 사용
const result1 = defaultTo(value, 'default');

// nullish coalescing + NaN 확인 사용 (더 빠름)
const result2 = (value == null || Number.isNaN(value)) ? 'default' : value;

// 또는 NaN 처리가 필요 없다면
const result3 = value ?? 'default';
```

여러 단계의 기본값 처리:

```typescript
import { defaultTo } from 'es-toolkit/compat';

function getConfigValue(userConfig, systemDefault, fallback) {
  // 사용자 설정 -> 시스템 기본값 -> 최종 대체값 순으로 확인
  return defaultTo(
    defaultTo(userConfig.setting, systemDefault),
    fallback
  );
}

const config = getConfigValue(
  { setting: null }, // 사용자가 설정하지 않음
  undefined,         // 시스템 기본값도 없음
  'hardcoded-default' // 최종 대체값
);

console.log(config); // 'hardcoded-default'
```

배열이나 객체에도 사용할 수 있어요:

```typescript
import { defaultTo } from 'es-toolkit/compat';

const users = defaultTo(response.users, []);
const metadata = defaultTo(response.metadata, {});

// 빈 배열이나 객체가 아닌 null/undefined/NaN만 처리해요
console.log(defaultTo([], ['default'])); // [] (빈 배열이지만 유효한 값)
console.log(defaultTo({}, { default: true })); // {} (빈 객체이지만 유효한 값)
```

#### 파라미터

- `value` (`T | null | undefined`): 확인할 값이에요.
- `defaultValue` (`D`): 값이 `null`, `undefined` 또는 `NaN`인 경우 반환할 기본값이에요.

### 반환 값

(`T | D`): 값이 유효하면 원래 값을, 그렇지 않으면 기본값을 반환해요.
