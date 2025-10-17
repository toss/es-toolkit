# pullAllBy (Lodash 호환성)

반복자로 변환된 값을 기준으로 지정된 값들을 배열에서 제거해요.

```typescript
const modified = pullAllBy(array, valuesToRemove, iteratee);
```

## 레퍼런스

### `pullAllBy(array, values, iteratee)`

제공된 iteratee 함수를 통해 각 요소를 변환한 값을 기준으로 배열에서 지정된 값들을 제거하세요. 원본 배열이 변경되고 변경된 배열이 반환돼요.

```typescript
import { pullAllBy } from 'es-toolkit/compat';

// 속성값으로 비교해서 제거해요
const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
pullAllBy(array, [{ x: 1 }, { x: 3 }], 'x');
console.log(array); // [{ x: 2 }]

// 함수로 값을 변환해서 비교해요
const numbers = [1, 2, 3, 4, 5];
pullAllBy(numbers, [2, 4], n => n % 2);
console.log(numbers); // [1, 3, 5] (홀수만 남음)
```

배열이 비어있거나 `null`, `undefined`면 원본 배열을 그대로 반환해요.

```typescript
import { pullAllBy } from 'es-toolkit/compat';

pullAllBy([], [1, 2], x => x); // []
pullAllBy(null as any, [1, 2], x => x); // null
```

#### 파라미터

- `array` (`T[]`): 변경할 배열이에요.
- `values` (`ArrayLike<T>`, 선택): 제거할 값들의 배열이에요.
- `iteratee` (`ValueIteratee<T>`, 선택): 각 요소에 적용할 iteratee 함수예요. 속성 이름, 부분 객체, 또는 함수를 사용할 수 있어요.

#### 반환 값

(`T[]`): 지정된 값들이 제거된 원본 배열을 반환해요.
