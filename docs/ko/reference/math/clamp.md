# clamp

Clamps a number within the inclusive lower and upper bounds.

This function takes a number and two bounds, and returns the number clamped within the specified bounds.
If only one bound is provided, it returns the minimum of the value and the bound.

## 인터페이스

```typescript
function clamp(value: number, maximum: number): number;
function clamp(value: number, minimum: number, maximum: number): number;
```

### 파라미터 

- `value` (`number`): The number to clamp.
- `minimum` (`number`): The minimum bound to clamp the number.
- `maximum` (`number`): The maximum bound to clamp the number.

### 반환 값

(`number`): The clamped number within the specified bounds.

## 예시

```typescript
const result1 = clamp(10, 5); // result1 will be 5, as 10 is clamped to the bound 5
const result2 = clamp(10, 5, 15); // result2 will be 10, as it is within the bounds 5 and 15
const result3 = clamp(2, 5, 15); // result3 will be 5, as 2 is clamped to the lower bound 5
const result4 = clamp(20, 5, 15); // result4 will be 15, as 20 is clamped to the upper bound 15
```
