# windowed

배열에서 지정된 크기의 슬라이딩 윈도우들을 만든 새로운 배열을 반환해요.

```typescript
const windows = windowed(arr, size, step?, options?);
```

## 레퍼런스

### `windowed(arr, size, step?, options?)`

배열을 일정한 크기로 나누어 윈도우를 만들고 싶을 때 `windowed`를 사용하세요. 슬라이딩 윈도우 기법으로 데이터를 분석하거나 처리할 때 유용해요.

```typescript
import { windowed } from 'es-toolkit/array';

// 기본 사용법 - 크기 3의 윈도우를 만들어요.
const numbers = [1, 2, 3, 4, 5];
const result = windowed(numbers, 3);
console.log(result); // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]

// step을 지정해서 윈도우 간격을 조절해요.
const data = [1, 2, 3, 4, 5, 6, 7, 8];
const stepped = windowed(data, 3, 2);
console.log(stepped); // [[1, 2, 3], [3, 4, 5], [5, 6, 7]]

// 문자열 배열로도 사용할 수 있어요.
const words = ['a', 'b', 'c', 'd', 'e'];
const wordWindows = windowed(words, 2);
console.log(wordWindows); // [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']]
```

부분 윈도우를 포함하고 싶으면 `partialWindows` 옵션을 사용하세요.

```typescript
import { windowed } from 'es-toolkit/array';

const numbers = [1, 2, 3, 4, 5, 6];

// 부분 윈도우 없이 (기본값)
const complete = windowed(numbers, 4, 3);
console.log(complete); // [[1, 2, 3, 4]]

// 부분 윈도우 포함
const withPartial = windowed(numbers, 4, 3, { partialWindows: true });
console.log(withPartial); // [[1, 2, 3, 4], [4, 5, 6]]
```

배열이 윈도우 크기보다 작으면 빈 배열이나 부분 윈도우를 반환해요.

```typescript
import { windowed } from 'es-toolkit/array';

const small = [1, 2];

// 윈도우가 배열보다 큰 경우
console.log(windowed(small, 5)); // []
console.log(windowed(small, 5, 1, { partialWindows: true })); // [[1, 2]]
```

#### 파라미터

- `arr` (`readonly T[]`): 윈도우를 만들 배열이에요.
- `size` (`number`): 각 윈도우의 크기예요. 1보다 큰 정수여야 해요.
- `step` (`number`, 선택): 윈도우 간의 간격이에요. 1보다 큰 정수여야 하고, 기본값은 `1`이에요.
- `options.partialWindows` (`boolean`, 선택): 배열 끝에서 완전하지 않은 윈도우도 포함할지 여부예요. 기본값은 `false`예요.

#### 반환 값

(`T[][]`): 지정된 크기와 간격으로 만들어진 윈도우들의 배열이에요.

#### 에러

- `size`나 `step`이 양의 정수가 아닌 경우 에러를 던져요.
