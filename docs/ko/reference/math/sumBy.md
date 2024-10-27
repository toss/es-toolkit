# sumBy

`getValue` 함수가 반환하는 값을 기준으로, 숫자 배열의 모든 요소를 더한 합계를 반환해요.

빈 배열에 대해서는 `0`을 반환해요.

만약 `getValue` 함수가 `bigint`를 반환한다면, 함수는 `bigint` 값을 반환해요. 하지만 배열이 비어있다면, 이 함수는 `0`을 반환해요.

## 인터페이스

```typescript
function sumBy<T>(items: T[], getValue: (element: T) => number): number;
function sumBy<T>(items: T[], getValue: (element: T) => bigint): bigint | number;
```

### 파라미터

- `items` (`T[]`): 합계를 계산할 숫자 배열이에요.
- `getValue` (`(item: T) => number | bigint`): 각 요소에서 숫자 값을 선택하는 함수에요.

### 반환 값

(`number | bigint`): `getValue` 함수를 기준으로, 배열에 있는 모든 숫자의 합계를 반환해요.

## 예시

```typescript
sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 6을 반환해요.
sumBy([], x => x.a); // 0을 반환해요.
sumBy([{ a: 1n }, { a: 2n }, { a: 3n }], x => x.a); // 6n을 반환해요.
```
