# clamp

숫자를 최솟값과 최댓값의 범위 내로 고정하는 함수예요.

이 함수는 숫자와 두 개의 경계를 받아서, 지정된 범위 내에서 고정된 숫자를 반환해요.
하나의 경계만 제공되면, 값과 경계 중 최솟값을 반환해요.

## 인터페이스

```typescript
function clamp(value: number, maximum: number): number;
function clamp(value: number, minimum: number, maximum: number): number;
```

### 파라미터

- `value` (`number`): 고정할 숫자예요.
- `minimum` (`number`): 숫자를 고정할 최솟값이에요.
- `maximum` (`number`): 숫자를 고정할 최댓값이에요.

### 반환 값

(`number`): 지정된 범위 내에서 고정된 숫자를 반환해요.

## 예시

```typescript
const result1 = clamp(10, 5); // 범위가 5로 고정되기 때문에 result1은 5가 되어요.
const result2 = clamp(10, 5, 15); // 10은 5와 15의 범위 내에 있기 때문에 result2는 10이 되어요.
const result3 = clamp(2, 5, 15); // 최소값이 5이기 때문에 result3는 5가 되어요.
const result4 = clamp(20, 5, 15); // 최대값이 15이기 때문에 result4는 15가 되어요.
```
