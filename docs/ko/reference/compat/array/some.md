# some (Lodash 호환성)

::: warning `Array.prototype.some()` 메서드를 사용하세요

이 `some` 함수는 다양한 타입의 조건 처리와 객체 지원으로 인해 복잡하게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.some()` 메서드를 사용하세요.

:::

배열이나 객체의 요소 중 주어진 조건을 만족하는 요소가 하나라도 있는지 확인해요.

```typescript
const hasMatch = some(collection, predicate);
```

## 레퍼런스

### `some(collection, predicate)`

배열이나 객체에서 조건을 만족하는 요소가 하나라도 있는지 확인할 때 `some`을 사용하세요. 다양한 형태의 조건을 지원해요.

```typescript
import { some } from 'es-toolkit/compat';

// 배열에서 조건 함수 사용
some([1, 2, 3, 4], n => n % 2 === 0);
// true를 반환해요 (2, 4가 짝수)

// 배열에서 부분 객체로 매칭
some([{ a: 1 }, { a: 2 }, { a: 3 }], { a: 2 });
// true를 반환해요

// 배열에서 속성-값 쌍으로 매칭
some([{ a: 1 }, { a: 2 }, { a: 3 }], ['a', 2]);
// true를 반환해요

// 배열에서 속성 이름으로 참인지 확인
some([{ a: 0 }, { a: 1 }, { a: 0 }], 'a');
// true를 반환해요 (a가 1인 요소가 있음)

// 객체에서 조건 함수 사용
some({ a: 1, b: 2, c: 3 }, n => n % 2 === 0);
// true를 반환해요 (2가 짝수)
```

조건이 제공되지 않으면 참으로 평가되는 값이 있는지 확인해요.

```typescript
import { some } from 'es-toolkit/compat';

some([0, 1, 2]); // true (1, 2가 참으로 평가됨)
some([false, null, undefined]); // false (모든 값이 거짓으로 평가됨)
some(null); // false (빈 배열로 처리됨)
```

#### 파라미터

- `collection` (`ArrayLike<T> | Record<any, any> | null | undefined`): 확인할 배열이나 객체예요.
- `predicate` (선택): 조건을 확인할 함수, 부분 객체, 속성-값 쌍, 또는 속성 이름이에요.

### 반환 값

(`boolean`): 조건을 만족하는 요소가 하나라도 있으면 `true`, 없으면 `false`를 반환해요.
