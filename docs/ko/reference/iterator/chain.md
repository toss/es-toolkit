# chain

여러 이터러블을 하나의 이터러블로 순서대로 이어붙여요.

```typescript
const iterable = chain(iterable1, iterable2, iterable3);
```

## 사용법

### `chain(...iterables)`

여러 이터러블을 순서대로 순회하고 싶을 때 `chain`을 사용하세요. `[...arr1, ...arr2]`처럼 새로운 배열을 메모리에 만들지 않고, 실제로 순회할 때까지 각 이터러블을 소비하지 않아요.

```typescript
import { chain } from 'es-toolkit/iterator';

// 여러 배열을 순서대로 이어붙여요.
const result = chain([1, 2, 3], [4, 5, 6]);
console.log([...result]); // [1, 2, 3, 4, 5, 6]

// 배열뿐만 아니라 모든 이터러블에서 동작해요.
const result = chain(new Set([1, 2]), new Map([[3, 'a']]).keys());
console.log([...result]); // [1, 2, 3]
```

빈 이터러블은 건너뛰어요.

```typescript
import { chain } from 'es-toolkit/iterator';

const result = chain([], [1, 2], []);
console.log([...result]); // [1, 2]
```

#### 파라미터

- `iterables` (`...Iterable<T>[]`): 이어붙일 이터러블들이에요.

#### 반환 값

(`IterableIterator<T>`): 각 이터러블의 요소를 순서대로 yield하는 지연 평가 이터러블 이터레이터예요.