# unionWith

두 요소가 일치하는지 여부를 판단하는 커스텀 함수를 기준으로, 두 배열의 합집합을 반환해요.

이 함수는 파라미터로 두 개의 배열과 커스텀 일치 함수를 받아요.
이 함수는 두 배열을 합친 뒤, 커스텀 일치 함수의 반환 값을 기준으로 중복된 요소를 제거한 새로운 배열을 반환해요.

## 인터페이스

```typescript
function unionWith<T>(arr1: T[], arr2: T[], areItemsEqual: (item1: T, item2: T) => boolean): T[];
```

### 파라미터

- `arr1` (`T[]`): 비교할 첫 번째 배열.
- `arr2` (`T[]`): 비교할 두 번째 배열.
- `areItemsEqual` (`(x: T, y: T) => boolean`): 두 요소가 일치하는지 판단하는 일치 함수예요. 두 요소가 일치한다면 `true`를, 일치하지 않는다면 `false`를 반환하게 해주세요.

### 반환 값

(`T[]`): 커스텀 일치 함수의 반환 값을 기준으로, 두 배열의 합집합을 나타내는 새로운 배열.

## 예시

```typescript
const array1 = [{ id: 1 }, { id: 2 }];
const array2 = [{ id: 2 }, { id: 3 }];
const areItemsEqual = (a, b) => a.id === b.id;
const result = unionWith(array1, array2, areItemsEqual);
// 결과는 [{ id: 1 }, { id: 2 }, { id: 3 }]가 돼요. { id: 2 }는 두 배열에 모두 포함되기 때문이에요.
```
