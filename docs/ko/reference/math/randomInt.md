# randomInt

주어진 범위 내에서 무작위 정수를 생성해요.

## 인터페이스

```typescript
function randomInt(minimum: number, maximum: number): number;
```

### 파라미터

- `minimum` (`number`): 무작위 정수를 생성할 최솟값(포함)이에요.
- `maximum` (`number`): 무작위 정수를 생성할 최댓값(미포함)이에요.

### 반환 값

- (`number`): 지정된 범위 내에서 무작위 정수를 반환해요.

## 예시

```typescript
const result1 = randomInt(0, 5); // 0과 5사이의 무작위 정수를 반환해요.
const result2 = randomInt(5, 0); // 최솟값이 최댓값보다 크면 오류가 발생해요.
const result3 = randomInt(5, 5); // 최솟값이 최댓값과 같으면 오류가 발생해요.
```
