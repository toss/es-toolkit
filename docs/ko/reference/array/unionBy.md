# unionBy

주어진 모든 배열에서 고유한 값을 제공된 매핑 함수를 사용하여 정렬된 순서대로 생성합니다.

## 시그니처

```typescript
function unionBy<T, U>(arr1: T[], arr2: T[], mapper: (item: T) => U): T[]
```

### 매개변수

- `arr1` (`T[]`): 첫 번째 배열.
- `arr2` (`T[]`): 두 번째 배열.
- `mapper`: (`(item: T) => U`): 배열 요소를 비교 값으로 매핑하는 함수.

### 반환값

(`T[]`): 매핑 함수에 의해 반환된 값에 따라 `arr1`과 `arr2`에서 고유한 요소의 합집합을 포함하는 새 배열.

## 예제

```typescript
unionBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id);
// 결과는 [{ id: 1 }, { id: 2 }, { id: 3 }]가 됩니다.
```
