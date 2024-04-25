# intersection

두 배열 모두에 포함되어 있는 요소를 반환해요.

이 함수는 두 개의 배열을 받고, 두 배열 모두에 포함되어 있는 요소로 구성된 새로운 배열을 반환해요. 
실제로는 첫 번째 배열의 요소들 중에서 두 번째 배열에 포함되어 있지 않은 요소들을 제거해요.


## 인터페이스

```typescript
function intersection<T>(firstArr: T[], secondArr: T[]): T[];
```

### 파라미터 

- `firstArr` (`T[]`): 비교할 첫 번째 배열.
- `secondArr` (`T[]`): 비교할 두 번째 배열.

### 반환 값

(`T[]`) 두 배열 모두에 포함되어 있는 요소로 구성된 새로운 배열.


## 예시

```typescript
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const result = intersection(array1, array2);
// 두 배열에 모두 포함되어 있는 [3, 4, 5]를 반환해요.
```
