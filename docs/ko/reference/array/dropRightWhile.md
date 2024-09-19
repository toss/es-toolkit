# dropRightWhile

배열의 끝부터 시작해서, 조건 함수가 `false`를 반환할 때까지 요소들을 제거해요.

이 함수는 각 배열의 요소를 순회하면서, 배열의 끝부터 조건 함수가 `false`를 반환할 때까지 요소를 제거해요.
남은 요소들로 구성된 새로운 배열을 반환해요.

## 인터페이스

```typescript
function dropRightWhile<T>(arr: T[], canContinueDropping: (item: T) => boolean): T[];
```

### 파라미터

- `arr` (`T[]`): 요소를 제거할 배열.
- `canContinueDropping` (`(item: T) => boolean`): 요소를 제거하는 것을 계속할지 반환하는 조건 함수예요. 각 요소에 대해서 호출되면서, `true`를 반환하는 동안 요소를 제거해요.

### 반환 값

(`T[]`): 조건 함수가 `false`를 반환할 때까지 남은 요소들로 이루어진 새로운 배열.

## 예시

```typescript
const array = [1, 2, 3, 2, 4, 5];
const result = dropRightWhile(array, x => x > 3);
// 3보다 작거나 같은 요소를 만날 때까지 요소를 제거하므로, 결괏값은 [1, 2, 3, 2]이 되어요.
```
