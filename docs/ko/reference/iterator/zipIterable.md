# zipIterable

여러 이터러블을 같은 인덱스끼리 묶어 튜플의 이터러블로 만들어줘요.

```typescript
const iterable = zipIterable(iterable1, iterable2);
```

## 사용법

### `zipIterable(...iterables)`

여러 이터러블을 동시에 순회하면서 같은 인덱스의 요소를 묶고 싶을 때 `zipIterable`을 사용하세요. `es-toolkit/array`의 `zip`과 달리, 배열뿐만 아니라 모든 이터러블을 받을 수 있고, 실제로 순회할 때까지 요소를 소비하지 않아요.

가장 짧은 이터러블이 소진되면 멈춰요.

```typescript
import { zipIterable } from 'es-toolkit/iterator';

// 두 배열의 요소를 같은 인덱스끼리 묶어요.
const result = zipIterable([1, 2, 3], ['a', 'b', 'c']);
console.log([...result]); // [[1, 'a'], [2, 'b'], [3, 'c']]

// 배열뿐만 아니라 모든 이터러블에서 동작해요.
const result = zipIterable(new Set(['alice', 'bob']), [90, 85]);
console.log([...result]); // [['alice', 90], ['bob', 85]]
```

길이가 다른 경우 가장 짧은 이터러블 기준으로 멈춰요.

```typescript
import { zipIterable } from 'es-toolkit/iterator';

const result = zipIterable([1, 2, 3], ['a', 'b']);
console.log([...result]); // [[1, 'a'], [2, 'b']]
```

### `es-toolkit/array`의 `zip`과의 차이점

| | `array/zip` | `iterator/zipIterable` |
| --- | --- | --- |
| 입력 | `Array`만 가능 | 모든 `Iterable` 가능 |
| 출력 | `Array` | `IterableIterator` (지연 평가) |
| 길이가 다를 때 | 긴 쪽 기준, `undefined`로 채움 | 짧은 쪽에서 멈춤 |
| 메모리 | 전체 배열 즉시 생성 | 필요한 만큼만 소비 |

#### 파라미터

- `iterables` (`...Iterable<T>[]`): 묶을 이터러블들이에요.

#### 반환 값

(`IterableIterator<T[]>`): 같은 인덱스의 요소를 튜플로 yield하는 지연 평가 이터러블 이터레이터예요.