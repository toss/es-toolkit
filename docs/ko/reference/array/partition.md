# partition

배열을 2개로 나누는 데에 쓸 수 있는 함수예요.

이 함수는 파라미터로 배열과 `true`/`false`를 반환하는 함수를 받아요.
이 함수는 두 개의 배열로 이루어진 튜플을 반환하는데요, 첫 번째 배열은 함수가 `true`를 반환하는 요소들로 구성돼요.
두 번째 배열은 함수가 `false`를 반환하는 요소들로 구성돼요.

## 인터페이스

```typescript
function partition<T>(arr: T[] | readonly T[], isInTruthy: (value: T) => boolean): [truthy: T[], falsy: T[]];
```

### 파라미터

- `arr` (`T[] | readonly T[]`): 2개로 나눌 배열.
- `isInTruthy` (`(value: T) => boolean`): 배열의 요소가 첫 번째 배열에 포함될지, 두 번째 배열에 포함될지 결정하는 함수. `true`를 반환하면 첫 번째 배열에, `false`를 반환하면 두 번째 배열에 포함돼요.

### 반환 값

(`[T[], T[]]`): 2개의 배열로 구성된 튜플. 첫 번째 배열은 `isInTruthy`가 `true`를 반환한 요소들로, 두 번째 배열은 `false`를 반환한 요소들로 구성돼요.

## 예시

```typescript
const array = [1, 2, 3, 4, 5];
const is짝수 = x => x % 2 === 0;
const [짝수, 홀수] = partition(array, is짝수);
// 짝수는 [2, 4], 홀수는 [1, 3, 5]가 되어요.
```
