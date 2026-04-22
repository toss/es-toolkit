# enumerate

이터러블의 각 요소에 인덱스를 함께 묶어줘요.

```typescript
const iterable = enumerate(iterable, start);
```

## 사용법

### `enumerate(iterable, start?)`

순회하면서 인덱스와 값을 함께 사용하고 싶을 때 `enumerate`를 사용하세요. `Array.prototype.entries()`와 달리, 배열뿐만 아니라 모든 이터러블에서 동작해요.

```typescript
import { enumerate } from 'es-toolkit/iterator';

// 각 요소에 인덱스를 묶어줘요.
const result = enumerate(['a', 'b', 'c']);
console.log([...result]); // [[0, 'a'], [1, 'b'], [2, 'c']]

// 배열뿐만 아니라 모든 이터러블에서 동작해요.
for (const [index, value] of enumerate(new Set(['x', 'y', 'z']))) {
  console.log(`${index}: ${value}`);
}
// 0: x
// 1: y
// 2: z
```

두 번째 인수로 시작 인덱스를 지정할 수 있어요.

```typescript
import { enumerate } from 'es-toolkit/iterator';

const result = enumerate(['a', 'b', 'c'], 1);
console.log([...result]); // [[1, 'a'], [2, 'b'], [3, 'c']]
```

#### 파라미터

- `iterable` (`Iterable<T>`): 열거할 이터러블이에요.
- `start` (`number`, 선택): 시작 인덱스예요. 기본값은 `0`이에요.

#### 반환 값

(`IterableIterator<[number, T]>`): `[인덱스, 요소]` 튜플을 yield하는 지연 평가 이터러블 이터레이터예요.