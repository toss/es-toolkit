# isSubset

`subset` 배열이 `superset` 배열의 하위 집합인지 확인해요.

## 인터페이스

```typescript
function isSubset<T>(superset: T[], subset: T[]): boolean;
```

### 파라미터

- `superset` (`T[]`): 하위 집합의 모든 요소를 포함 할 수 있는 배열이에요.
- `subset` (`D`): 상위 집합 배열에 포함되어 있는지 비교 할 배열이에요.

### 반환 값

(`boolean`): `subset` 배열이 `superset` 배열에 모두 포함되면 `true`를 반환해요.

## 예시

```typescript
const superset1 = [1, 2, 3, 4, 5];
const subset1 = [2, 3, 4];

isSubset(superset1, subset1);
// true를 반환해요.

const superset2 = ['a', 'b', 'c'];
const subset2 = ['a', 'd'];
isSubset(superset2, subset2);
// false를 반환해요.
```
