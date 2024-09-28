# union

두 배열을 합치면서, 중복된 값은 제거한 합집합을 반환해요.

## 인터페이스

```typescript
function union<T>(arr1: T[], arr2: T[]): T[];
```

### 파라미터

- `arr1` (`T[]`): 합칠 첫 번째 배열.
- `arr2` (`T[]`): 합칠 두 번째 배열.

### 반환 값

(`T[]`): 합쳐지고 중복된 값이 제거된 새 배열.

## 예시

```typescript
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];
const result = union(array1, array2);
// result는 [1, 2, 3, 4, 5]가 돼요.
```
