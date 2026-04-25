# join (Lodash 호환성)

::: warning `Array.prototype.join()`을 사용하세요

이 `join` 함수는 ArrayLike 객체 처리, null/undefined 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.join()`을 사용하세요.

:::

배열의 요소를 문자열로 결합해요.

```typescript
const result = join(array, separator);
```

## 사용법

### `join(array, separator?)`

배열의 모든 요소를 하나의 문자열로 합칠 때 `join`을 사용하세요. 각 요소 사이에 구분자를 넣어서 연결해요.

```typescript
import { join } from 'es-toolkit/compat';

// 문자열 배열 결합
const arr = ['a', 'b', 'c'];
join(arr, '~'); // => "a~b~c"

// 숫자 배열 결합
const numbers = [1, 2, 3];
join(numbers, '-'); // => "1-2-3"
```

구분자를 생략하면 쉼표(`,`)가 기본값으로 사용돼요.

```typescript
import { join } from 'es-toolkit/compat';

join(['a', 'b', 'c']); // => "a,b,c"
```

`null`이나 `undefined`는 빈 배열로 처리돼요.

```typescript
import { join } from 'es-toolkit/compat';

join(null, '-'); // => ""
join(undefined, '-'); // => ""
```

#### 파라미터

- `array` (`T[]`) - 결합할 배열이에요.

::: info `array`는 `ArrayLike<T>`이거나 `null` 또는 `undefined`일 수 있어요

lodash와 완전히 호환되도록 `join` 함수는 `array`를 다음과 같이 처리해요.

- `array`가 `ArrayLike<T>`인 경우, 배열로 변환하기 위해 `Array.from(...)`을 사용해요.
- `array`가 `null` 또는 `undefined`인 경우, 빈 배열로 간주돼요.

:::

- `separator` (`string`, 선택) - 요소를 결합하는 데 사용하는 구분자예요. 기본값은 쉼표(`,`)예요.

#### 반환 값

(`string`): 지정된 구분자로 배열의 모든 요소가 결합된 문자열을 반환해요.
