# zipObject (Lodash 호환성)

::: warning `es-toolkit`의 [zipObject](../../array/zipObject.md)를 사용하세요

이 `zipObject` 함수는 Lodash와의 호환성을 위해 추가적인 처리가 포함되어 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [zipObject](../../array/zipObject.md)를 사용하세요.

:::

두 배열을 사용해서 객체를 만들어요. 첫 번째 배열은 버전망을 프로퍼티 이름으로, 두 번째 배열은 해당 값으로 사용해요.

```typescript
const result = zipObject(keys, values);
```

## 레퍼런스

### `zipObject(keys, values)`

키 배열과 값 배열을 받아서 하나의 객체로 만들고 싶을 때 `zipObject`를 사용하세요. 첫 번째 배열의 요소들을 프로퍼티 이름으로, 두 번째 배열의 요소들을 해당 값으로 사용해서 객체를 만들어요. API 응답을 처리하거나 데이터를 변환할 때 특히 유용해요.

```typescript
import { zipObject } from 'es-toolkit/compat';

// 기본 사용법
const keys = ['a', 'b', 'c'];
const values = [1, 2, 3];
const result = zipObject(keys, values);
// Returns: { a: 1, b: 2, c: 3 }

// 길이가 다른 배열들
const keys2 = ['x', 'y', 'z'];
const values2 = [10, 20];
const result2 = zipObject(keys2, values2);
// Returns: { x: 10, y: 20, z: undefined }

// 빈 배열이 전달된 경우
const result3 = zipObject([], []);
// Returns: {}
```

#### 파라미터

- `keys` (`PropertyKey[]`): 프로퍼티 이름으로 사용할 배열이에요.
- `values` (`T[]`): 프로퍼티 값으로 사용할 배열이에요.

#### 반환 값

(`Record<PropertyKey, T>`): 만들어진 객체예요.
