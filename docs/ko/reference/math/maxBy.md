# maxBy

주어진 배열 내의 요소들 중에서 조건에 따라 최대값을 가지는 첫 번째 요소를 선택하는 함수에요.

배열이 비어있지 않다면 조건에 따라 최대값을 가지는 첫 번째 요소를 반환하고, 비어있다면 `undefined`를 반환해요.

## 인터페이스

```typescript
function maxBy<T>(elements: T[], selector: (element: T) => number): T;
```

### 파라미터

- `elements`: 검색할 요소들의 배열.
- `selector`: 요소를 받아서 객체의 속성을 반환하는 함수.

### 반환 값

함수의 최대값을 가지는 배열의 첫 번째 요소. 만약 배열이 비어있다면 `undefined`를 반환해요.

## 예시

```typescript
maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 결과: { a: 3 }
maxBy([], x => x.a); // 결과: undefined
```
