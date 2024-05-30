# xorWith

사용자 정의 함수(equality function)를 사용하여 두 배열 간의 대칭 차집합을 계산해요.
대칭 차집합은 두 배열 중 하나에는 있지만 교집합에는 없는 요소들의 집합이에요.

## 인터페이스

```typescript
function xorWith<T>(arr1: T[], arr2: T[], areElementsEqual: (item1: T, item2: T) => boolean): T[];
```

### 파라미터

- `arr1` (`T[]`): 첫 번째 배열이에요.
- `arr2` (`T[]`): 두 번째 배열이에요.
- `areElementsEqual` (`(item1: T, item2: T) => boolean`): 배열의 요소를 비교하기 위한 사용자 정의 동등 함수예요.

### 반환 값

(`T[]`): 사용자 정의 동등 함수에 따라 `arr1` 또는 `arr2`에 있지만 교집합엔 없는 요소들을 포함하는 배열이에요.

## 예시

```typescript
// [{ id: 1 }, { id: 3 }]를 반환해요.
xorWith([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id);
```
