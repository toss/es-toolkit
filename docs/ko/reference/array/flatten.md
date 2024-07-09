# flatten

인자로 넣은 중첩 배열을 원하는 깊이까지 평탄화해요.

JavaScript에서 기본적으로 제공하는 [Array.prototype.flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)과 동일한 동작과 반환 타입을 가져요. 하지만 성능은 더 우수합니다.

## 인터페이스

```typescript
function flatten<T, D extends number = 1>(arr: T[], depth?: D): Array<FlatArray<T[], D>>;
```

### 파라미터

- `arr` (`T[]`): 평탄화 할 배열이에요.
- `depth` (`D`): 평탄화 할 깊이에요. 기본 값은 1이에요.

### 반환 값

(`Array<FlatArray<T[], D>>`) 원하는 깊이로 평탄화 된 새로운 배열이에요.

## 예시

```typescript
const originArr = [1, [2, 3], [4, [5, 6]]];

const array1 = flatten(originArr);
// [1, 2, 3, 4, [5, 6]]를 반환해요.

const array2 = flatten(originArr, 1);
// [1, 2, 3, 4, [5, 6]]를 반환해요.

const array3 = flatten(originArr, 2);
// [1, 2, 3, 4, 5, 6]를 반환해요.
```
