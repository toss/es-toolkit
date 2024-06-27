# random

주어진 범위 내에서 무작위 숫자를 생성해요. 여기에서 숫자는 정수뿐만 아니라 소수점 있는 숫자도 포함해요.

## 인터페이스

```typescript
function random(minimum: number, maximum: number): number;
```

### 파라미터

- `minimum` (`number`): 무작위 숫자를 생성할 최솟값(포함)이에요.
- `maximum` (`number`): 무작위 숫자를 생성할 최댓값(미포함)이에요.

### 반환 값

- (`number`): 지정된 범위 내에서 무작위 숫자를 반환해요. 숫자는 정수뿐만 아니라 소수점 있는 숫자도 포함해요.

## 예시

```typescript
const result1 = random(0, 5); // 0과 5사이의 무작위 부동 소수점 숫자를 반환해요.
const result2 = random(5, 0); // 최솟값이 최댓값보다 크면 오류가 발생해요.
const result3 = random(5, 5); // 최솟값이 최댓값과 같으면 오류가 발생해요.
```
