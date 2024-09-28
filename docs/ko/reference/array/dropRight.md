# dropRight

배열의 마지막부터 몇 개의 요소를 제거한 새로운 배열을 반환해요.

이 함수는 파라미터로 배열과 숫자를 받아요. 배열의 마지막부터 숫자만큼의 요소를 제외한 새로운 배열을 반환해요.

## 인터페이스

```typescript
function dropRight<T>(arr: T[], itemsCount: number): T[];
```

### 파라미터

- `arr` (`T[]`): 요소를 제거할 배열.
- `itemsCount` (`number`): 배열의 마지막부터 제거할 요소의 숫자.

### 반환 값

(`T[]`): 배열의 마지막부터 숫자만큼의 요소를 제외한 새로운 배열을 반환해요.

## 예시

```typescript
const array = [1, 2, 3, 4, 5];
const result = dropRight(array, 2);
// 마지막 두 개 요소가 반환되므로, 결괏값은 [1, 2, 3]이 돼요.
```
