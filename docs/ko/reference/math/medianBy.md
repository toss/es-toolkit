# medianBy

`getValue` 함수를 각 요소에 적용하여, 요소 배열의 중앙값을 계산하는 함수예요.

[중앙값](./median.md)이란 배열을 정렬했을 때 중앙에 위치하는 요소를 말해요.
배열이 홀수 개의 요소를 가진다면, 중앙에 있는 요소를 반환해요.
배열이 짝수 개의 요소를 가진다면, 중앙에 있는 두 요소의 평균을 반환해요.

빈 배열이 주어지면 `NaN`을 반환해요.

## 인터페이스

```typescript
function medianBy<T>(items: T[], getValue: (element: T) => number): number;
```

### 파라미터

- `items` (`T[]`): 중앙값을 계산할 배열이에요.
- `getValue` (`(element: T) => number`): 각 요소에서 숫자 값을 선택하는 함수예요.

### 반환 값

(`number`): `getValue` 함수를 기준으로, 배열에 있는 모든 숫자의 중앙값을 반환해요.

## 예시

```typescript
medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], x => x.a); // 3을 반환해요.
medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }], x => x.a); // 2.5를 반환해요.
medianBy([], x => x.a); // NaN을 반환해요.
```
