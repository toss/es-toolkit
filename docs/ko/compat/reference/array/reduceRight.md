# reduceRight (Lodash 호환성)

::: warning `Array.prototype.reduceRight`나 `Object.values`와 `reduceRight`를 사용하세요

이 `reduceRight` 함수는 복잡한 타입 처리와 다양한 입력 형태 지원으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.reduceRight` 메서드나 객체의 경우 `Object.values`와 `reduceRight`를 함께 사용하세요.

:::

배열이나 객체를 오른쪽부터 순회해서 하나의 값으로 줄여요.

```typescript
const result = reduceRight(collection, iteratee, initialValue);
```

## 사용법

### `reduceRight(collection, iteratee, initialValue)`

배열이나 객체의 모든 요소를 오른쪽부터 왼쪽으로 순회하면서 누적값을 계산하세요. 초기 값을 제공하면 그 값부터 시작하고, 그렇지 않으면 마지막 요소부터 시작해요.

```typescript
import { reduceRight } from 'es-toolkit/compat';

// 배열을 문자열로 합치기 (오른쪽부터)
const letters = ['a', 'b', 'c', 'd'];
const result = reduceRight(letters, (acc, value) => acc + value, '');
console.log(result); // 'dcba'

// 객체 값들의 곱셈 (키 순서의 역순)
const numbers = { x: 2, y: 3, z: 4 };
const product = reduceRight(numbers, (acc, value) => acc * value, 1);
console.log(product); // 24 (1 * 4 * 3 * 2)
```

초기 값을 제공하지 않으면 마지막 요소가 초기 값이 되고 뒤에서 두 번째 요소부터 순회해요.

```typescript
import { reduceRight } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4];
const sum = reduceRight(numbers, (acc, value) => acc + value);
console.log(sum); // 10 (4 + 3 + 2 + 1)

// 빈 배열이면 undefined가 반환돼요
const empty = [];
const result = reduceRight(empty, (acc, value) => acc + value);
console.log(result); // undefined
```

#### 파라미터

- `collection` (`T[] | ArrayLike<T> | Record<string, T> | null | undefined`): 순회할 배열이나 객체예요.
- `iteratee` (`(accumulator: any, value: any, index: PropertyKey, collection: any) => any`): 각 요소에 대해 호출할 함수예요. 누적값, 현재 값, 인덱스/키, 원본 배열/객체를 받아요.
- `initialValue` (`any`, 선택): 누적값의 초기 값이에요. 제공하지 않으면 마지막 요소가 초기 값이 돼요.

#### 반환 값

(`any`): 모든 요소를 처리한 후의 최종 누적값을 반환해요.
