# isSubsetWith

`subset` 배열이 `superset` 배열의 하위 집합인지 확인해요.

이 함수는 두 개의 배열과 비교 함수를 받아요. 비교 함수는 요소가 같은지를 판단하는 데 사용돼요. 이 함수는 `subset` 배열의 모든 요소가 `superset` 배열에 존재할 경우 `true`를 반환하고, 그렇지 않으면 `false`를 반환해요.

## 인터페이스

```typescript
function isSubsetWith<T>(superset: T[], subset: T[], areItemsEqual: (x: T, y: T) => boolean): boolean;
```

### 파라미터

- `superset` (`T[]`): 하위 집합의 모든 요소를 포함 할 수 있는 배열이에요.
- `subset` (`T[]`): 상위 집합 배열에 포함되어 있는지 비교 할 배열이에요.
- `areItemsEqual` (`(x: T, y: T) => boolean`): 두 요소가 동일한지 결정할 함수에요.

### 반환 값

(`boolean`): `subset` 배열이 `superset` 배열에 모두 포함되면 `true`를 반환해요.

## 예시

```typescript
const superset = [{ id: 1 }, { id: 2 }, { id: 3 }];
const subset = [{ id: 2 }, { id: 1 }];
const areItemsEqual = (a, b) => a.id === b.id;

isSubsetWith(superset, subset, areItemsEqual);
// true를 반환해요.

const superset = [{ id: 1 }, { id: 2 }, { id: 3 }];
const subset = [{ id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;

isSubsetWith(superset, subset, areItemsEqual);
// false를 반환해요.
```
