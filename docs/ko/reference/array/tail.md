# tail

첫 번째 요소를 제외한 모든 요소가 포함된 새 배열을 반환합니다.

이 함수는 배열을 입력받아 첫 번째 요소를 제외한 모든 요소를 포함하는 새 배열을 반환합니다. 입력 배열이 비어 있거나 요소가 하나만 있는 경우 빈 배열을 반환합니다.

## 인터페이스

```typescript
function tail<T>(arr: readonly [T]): [];
function tail(arr: readonly []): [];
function tail<T, U>(arr: readonly [T, ...U[]]): U[];
function tail<T>(arr: readonly T[]): T[];
```

### 파라미터

- `arr` (`readonly T[]`): 첫 번째 요소를 제외할 배열이에요.

### 반환 값

(`T[]`): 입력 배열의 첫 번째 요소를 제외한 모든 요소가 포함된 새 배열이에요.

## 예시

```typescript
const arr1 = [1, 2, 3];
const result = tail(arr1);
// result는 [2, 3]가 돼요.

const arr2 = [1];
const result2 = tail(arr2);
// result2는 []가 돼요.

const arr3 = [];
const result3 = tail(arr3);
// result3는 []가 돼요.
```
