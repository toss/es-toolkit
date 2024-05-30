# intersectionBy

`mapper` 함수가 반환하는 값을 기준으로, 두 배열의 교집합을 반환해요.

이 함수는 파라미터로 두 개의 배열과 `mapper` 함수를 받아요. 
`mapper` 함수로 각 배열의 요소들을 변환했을 때, 두 배열에 모두 포함되는 요소들로 이루어진 새로운 배열을 반환해요.
구체적으로는, 첫 번째 배열과 두 번째 배열을 `mapper` 가 반환하는 값을 기준으로 비교하여, 첫 번째 배열의 요소들 중 두 번째 배열에 없는 요소들을 제거해요.


## 인터페이스

```typescript
function intersectionBy<T, U>(firstArr: T[], secondArr: T[], mapper: (item: T) => U): T[];
```

### 파라미터 


- `firstArr` (`T[]`): 비교할 첫 번째 배열.
- `secondArr` (`T[]`): 비교할 두 번째 배열.
- `mapper` (`(item: T) => U`): 비교하기 위해 요소를 새로운 값으로 변환할 함수.

### 반환 값

(`T[]`): 첫 번째 배열과 두 번째 배열을 `mapper` 가 반환하는 값을 기준으로 비교하여, 두 배열 모두에 포함되는 요소들만 포함하는 새로운 배열.


## 예시

```typescript
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const mapper = item => item.id;
const result = intersectionBy(array1, array2, mapper);
// `mapper`로 변환했을 때 두 배열 모두에 포함되는 요소로 이루어진 [{ id: 2 }] 값이 반환되어요.
```
