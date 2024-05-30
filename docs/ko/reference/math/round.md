# round

Rounds a number to a specified precision.

This function takes a number and an optional precision value, and returns the number rounded 
to the specified number of decimal places.

## 인터페이스

```typescript
function round(value: number, precision?: number): number;
```

### 파라미터 

- `value` (`number`): The number to round.
- `precision` (`number`, optional): The number of decimal places to round to. Defaults to 0.

### 반환 값

(`number`): The rounded number.

## 예시

```typescript
const result1 = round(1.2345); // result1 will be 1
const result2 = round(1.2345, 2); // result2 will be 1.23
const result3 = round(1.2345, 3); // result3 will be 1.235
