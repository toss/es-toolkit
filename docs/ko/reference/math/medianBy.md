# medianBy

`getValue` 함수를 각 요소에 적용하여, 요소 배열의 중앙값을 계산하는 함수에요.

빈 배열에 대해서는 `NaN`을 반환해요.
배열의 요소 수가 홀수인 경우, 중앙 요소를 반환해요.
배열의 요소 수가 짝수인 경우, 중앙의 두 요소의 평균을 반환해요.

## 인터페이스

```typescript
export function medianBy<T>(items: readonly T[], getValue: (element: T) => number): number;
```

### 파라미터

- `items` (`readonly T[]`): 중앙값을 계산할 배열이에요.
- `getValue` (`(element: T) => number`): 각 요소에서 숫자 값을 선택하는 함수에요.

### 반환 값

(`number`): `getValue` 함수를 기준으로, 배열에 있는 모든 숫자의 중앙값을 반환해요.

## 예시

```typescript
medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], x => x.a); // 3을 반환해요.
medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }], x => x.a); // 2.5를 반환해요.
medianBy([], x => x.a); // NaN을 반환해요.
```
