# unionWith

사용자 정의 동등성 함수를 기반으로 두 배열에서 고유한 값의 배열을 생성합니다.

이 함수는 두 배열과 사용자 정의 동등성 함수를 받아 배열을 병합하고 사용자 정의 동등성 함수에 의해 고유한 값만 포함하는 새 배열을 반환합니다.

## 시그니처

```typescript
function unionWith<T>(arr1: T[], arr2: T[], areItemsEqual: (item1: T, item2: T) => boolean): T[];
```

### 매개변수

- `arr1` (`T[]`): 병합하고 고유 값을 필터링할 첫 번째 배열.
- `arr2` (`T[]`): 병합하고 고유 값을 필터링할 두 번째 배열.
- `areItemsEqual` (`(item1: T, item2: T) => boolean`): 두 요소가 동일한지 여부를 결정하는 사용자 정의 함수. 이 함수는 두 개의 인수를 받고, 요소가 동일하다고 간주되면 `true`, 그렇지 않으면 `false`를 반환합니다.

### 반환값

(`T[]`): 사용자 정의 동등성 함수에 따라 고유한 값의 새 배열.

## 예제

```typescript
const array1 = [{ id: 1 }, { id: 2 }];
const array2 = [{ id: 2 }, { id: 3 }];
const areItemsEqual = (a, b) => a.id === b.id;
const result = unionWith(array1, array2, areItemsEqual);
// 결과는 [{ id: 1 }, { id: 2 }, { id: 3 }]가 됩니다. { id: 2 }는 두 배열에서 동일한 것으로 간주됩니다.
```
