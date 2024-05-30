# union

모든 주어진 배열에서 고유한 값의 배열을 생성합니다.

이 함수는 두 배열을 받아 단일 배열로 병합한 후 병합된 배열에서 고유한 값만 포함하는 새 배열을 반환합니다.

## 시그니처

```typescript
function union<T>(arr1: T[], arr2: T[]): T[];
```

### 매개변수

- `arr1` (`T[]`): 병합하고 고유 값을 필터링할 첫 번째 배열입니다.
- `arr2` (`T[]`): 병합하고 고유 값을 필터링할 두 번째 배열입니다.

### 반환값

(`T[]`): 고유한 값의 새 배열입니다.

## 예제

```typescript
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];
const result = union(array1, array2);
// result는 [1, 2, 3, 4, 5]가 됩니다.
```
