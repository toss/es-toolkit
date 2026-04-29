# includes (Lodash 호환성)

::: warning `Array.prototype.includes`를 사용하세요

이 `includes` 함수는 객체 순회와 SameValueZero 비교 처리로 인해 느리게 동작해요. 배열에서는 JavaScript의 기본 `Array.prototype.includes` 메소드가 더 빠르고 표준화되어 있어요.

대신 더 빠르고 현대적인 `Array.prototype.includes`를 사용하세요.

:::

배열, 객체, 또는 문자열에서 특정 값이 포함되어 있는지 확인해요.

```typescript
const hasValue = includes(collection, target, fromIndex);
```

## 사용법

### `includes(collection, target, fromIndex)`

배열, 객체, 문자열에서 특정 값이 존재하는지 확인하고 싶을 때 `includes`를 사용하세요. SameValueZero 방식으로 값을 비교해요.

```typescript
import { includes } from 'es-toolkit/compat';

// 배열에서 값 찾기
includes([1, 2, 3], 2);
// Returns: true

// 객체의 값들 중에서 찾기
includes({ a: 1, b: 'a', c: NaN }, 'a');
// Returns: true

// 문자열에서 부분 문자열 찾기
includes('hello world', 'world');
// Returns: true
```

특정 인덱스부터 검색을 시작할 수 있어요.

```typescript
import { includes } from 'es-toolkit/compat';

// 인덱스 2부터 검색
includes([1, 2, 3, 2], 2, 2);
// Returns: true (인덱스 3에 있음)

// 음수 인덱스는 끝에서부터 계산
includes([1, 2, 3], 2, -2);
// Returns: true
```

`null`이나 `undefined`는 항상 `false`를 반환해요.

```typescript
import { includes } from 'es-toolkit/compat';

includes(null, 1); // false
includes(undefined, 1); // false
```

문자열에서도 부분 문자열을 검색할 수 있어요.

```typescript
import { includes } from 'es-toolkit/compat';

// 처음부터 검색
includes('hello', 'e');
// Returns: true

// 특정 위치부터 검색
includes('hello', 'e', 2);
// Returns: false (인덱스 2 이후에는 'e'가 없음)
```

`NaN` 값도 올바르게 찾을 수 있어요.

```typescript
import { includes } from 'es-toolkit/compat';

includes([1, 2, NaN], NaN);
// Returns: true

includes({ a: 1, b: NaN }, NaN);
// Returns: true
```

#### 파라미터

- `collection` (`Array | Record<string, any> | string | null | undefined`): 검색할 배열, 객체, 또는 문자열이에요.
- `target` (`any`): 찾으려는 값이에요.
- `fromIndex` (`number`, 선택): 검색을 시작할 인덱스예요. 음수 값은 끝에서부터 계산해요. 기본값은 `0`이에요.

#### 반환 값

(`boolean`): 값이 존재하면 `true`, 그렇지 않으면 `false`를 반환해요.
