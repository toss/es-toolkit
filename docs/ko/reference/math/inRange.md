# inRange

값이 지정된 범위 내에 있는지 확인해요.

## 인터페이스

```typescript
function inRange(value: number, maximum: number): boolean;
function inRange(value: number, minimum: number, maximum: number): boolean;
```

### 파라미터

- `value` (`number`): 확인할 값이에요.
- `minimum` (`number`): 범위의 최솟값(포함)이에요.
- `maximum` (`number`): 범위의 최댓값(미포함)이에요.

### 반환 값

(`boolean`): 값이 지정된 범위 내에 있으면 `true`, 그렇지 않으면 `false`가 돼요.

### 에러

`minimum`이 `maximum`보다 크거나 같으면 에러를 던져요.

## 예시

```typescript
const result1 = inRange(3, 5); // result1은 true가 돼요.
const result2 = inRange(1, 2, 5); // result2은 false가 돼요.
const result3 = inRange(1, 5, 2); // 최솟값이 최댓값보다 크거나 같으면 에러가 발생해요.
```
