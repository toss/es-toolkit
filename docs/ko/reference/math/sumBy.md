# sumBy

`getValue` 함수가 반환하는 값을 기준으로, 숫자 배열의 모든 요소를 더한 합계를 반환해요.

빈 배열에 대해서는 `0`을 반환해요.

## 인터페이스

```typescript
export function sumBy<T>(items: T[], getValue: (element: T) => number): number;
```

### 파라미터

- `items` (`T[]`): 합계를 계산할 숫자 배열이에요.
- `getValue` (`(item: T) => number`): 각 요소에서 숫자 값을 선택하는 함수에요.

### 반환 값

(`number`): `getValue` 함수를 기준으로, 배열에 있는 모든 숫자의 합계를 반환해요.

## 예시

```typescript
sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 6을 반환해요.
sumBy([], x => x.a); // 0을 반환해요.
```
