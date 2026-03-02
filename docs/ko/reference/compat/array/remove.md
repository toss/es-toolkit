# remove (Lodash 호환성)

::: warning `es-toolkit`의 `remove`를 사용하세요

이 `remove` 함수는 Lodash와의 호환성을 위해 여러 형태의 predicate를 지원하므로 복잡하게 구현되어 있어요. 메인 라이브러리의 `remove` 함수는 간단한 함수 predicate만 지원하므로 더 빠르게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [remove](../../array/remove.md)를 사용하세요.

:::

배열에서 조건에 맞는 요소들을 제거하고 제거된 요소들을 배열로 반환해요.

```typescript
const removedElements = remove(array, predicate);
```

## 사용법

### `remove(array, predicate)`

배열을 순회하며 주어진 조건에 맞는 요소들을 원본 배열에서 제거하고, 제거된 요소들을 새 배열로 반환해요. 원본 배열이 직접 수정되므로 주의해야 해요.

```typescript
import { remove } from 'es-toolkit/compat';

// 함수를 사용한 조건으로 제거
const numbers = [1, 2, 3, 4, 5];
const evens = remove(numbers, n => n % 2 === 0);
console.log(numbers); // => [1, 3, 5]
console.log(evens); // => [2, 4]

// 객체의 부분 매칭으로 제거
const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
const removed = remove(objects, { a: 1 });
console.log(objects); // => [{ a: 2 }, { a: 3 }]
console.log(removed); // => [{ a: 1 }]

// 속성-값 쌍으로 제거
const items = [{ name: 'apple' }, { name: 'banana' }, { name: 'cherry' }];
const cherries = remove(items, ['name', 'cherry']);
console.log(items); // => [{ name: 'apple' }, { name: 'banana' }]
console.log(cherries); // => [{ name: 'cherry' }]
```

이 함수는 다양한 형태의 predicate를 지원해요.

```typescript
import { remove } from 'es-toolkit/compat';

// 함수를 사용한 조건
remove(users, user => user.active === false);

// 객체의 부분 매칭
remove(users, { status: 'inactive' });

// 속성-값 배열
remove(users, ['type', 'guest']);

// 속성명으로 truthy 값 확인
remove(users, 'isDeleted');
```

#### 파라미터

- `array` (`ArrayLike<T>`): 수정할 배열이에요.
- `predicate` (`((value: T, index: number, array: ArrayLike<T>) => boolean) | Partial<T> | [keyof T, unknown] | keyof T`, 선택): 각 요소에 대해 실행할 조건이에요. 기본값은 `identity`예요.

#### 반환 값

(`T[]`): 조건에 맞아서 제거된 요소들로 구성된 새 배열을 반환해요.
