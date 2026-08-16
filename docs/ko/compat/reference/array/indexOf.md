# indexOf (Lodash 호환성)

::: warning `Array.prototype.indexOf`나 `Array.prototype.findIndex`를 사용하세요

이 `indexOf` 함수는 `NaN` 처리를 위한 추가 로직으로 인해 느리게 동작해요.

`NaN`을 찾지 않는다면 더 빠른 `Array.prototype.indexOf`를, `NaN`을 포함해서 찾으려면 `Array.prototype.findIndex`와 `Number.isNaN`을 사용하세요.

:::

배열에서 주어진 요소가 첫 번째로 일치하는 인덱스를 찾아요.

```typescript
const index = indexOf(array, searchElement, fromIndex);
```

## 사용법

### `indexOf(array, searchElement, fromIndex?)`

`Array.prototype.indexOf`와 거의 같게 동작하는데요, `NaN` 값을 찾을 수 있어요. 배열에서 특정 값의 위치를 알아야 할 때 사용하세요.

```typescript
import { indexOf } from 'es-toolkit/compat';

// 숫자 배열에서 요소 찾기
const array = [1, 2, 3, 4];
indexOf(array, 3); // => 2

// NaN 값 찾기 (Array.prototype.indexOf는 찾지 못해요)
const arrayWithNaN = [1, 2, NaN, 4];
indexOf(arrayWithNaN, NaN); // => 2
```

특정 인덱스부터 검색을 시작할 수 있어요.

```typescript
import { indexOf } from 'es-toolkit/compat';

const array = [1, 2, 3, 1, 2, 3];
indexOf(array, 2, 2); // => 4 (인덱스 2부터 검색 시작)
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { indexOf } from 'es-toolkit/compat';

indexOf(null, 1); // => -1
indexOf(undefined, 1); // => -1
```

#### 파라미터

- `array` (`T[]`): 검색할 배열.

::: info `array`는 `ArrayLike<T>`이거나 `null` 또는 `undefined`일 수 있어요

lodash와 완전히 호환되도록 `indexOf` 함수는 `array`를 다음과 같이 처리해요.

- `array`가 `ArrayLike<T>`인 경우, 배열로 변환하기 위해 `Array.from(...)`을 사용해요.
- `array`가 `null` 또는 `undefined`인 경우, 빈 배열로 간주돼요.

:::

- `searchElement` (`T`): 찾을 값이에요.
- `fromIndex` (`number`, 선택): 검색을 시작할 인덱스예요. 음수를 사용하면 배열 끝에서부터 계산해요. 기본값은 `0`이에요.

#### 반환 값

(`number`): 배열에서 주어진 값과 첫 번째로 일치하는 요소의 인덱스를 반환해요. 일치하는 요소를 찾을 수 없으면 `-1`을 반환해요.
