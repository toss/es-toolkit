# minBy

함수가 반환하는 값을 기준으로, 배열에서 최솟값을 가지는 요소를 반환해요.

## 인터페이스

```typescript
function minBy<T>(items: [T, ...T[]], getValue: (element: T) => number): T;
function minBy<T>(items: T[], getValue: (element: T) => number): T | undefined;
```

### 파라미터

- `items` (`T[]`): 최솟값을 가지는 요소를 찾을 배열.
- `getValue` (`(element: T) => number`): 요소에 해당되는 숫자를 계산하는 함수.

### 반환 값

(`T`): `getValue` 함수를 기준으로, 배열에서 최솟값을 가지는 요소.

## 예시

```typescript
minBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 1 }
minBy([], x => x.a); // Returns: undefined
```
