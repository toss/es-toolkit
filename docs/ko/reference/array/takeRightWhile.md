# takeRightWhile

조건 함수가 `true`를 반환하는 동안 배열의 끝에서부터 요소들을 가져와요.
조건을 만족하지 않는 요소가 나오면 멈춰요.

## 인터페이스

```typescript
function takeRightWhile<T>(arr: T[], shouldContinueTaking: (item: T) => boolean): T[];
```

### 파라미터

- `arr` (`T[]`): 요소를 가져올 배열이에요.
- `shouldContinueTaking` (`(item: T) => boolean`): 각 요소와 함께 호출되는 조건 함수예요. 이 함수가 `true`를 반환하는 동안 요소들이 결과에 포함돼요.

### 반환 값

(`T[]`): 조건 함수가 `true`를 반환하는 동안 배열의 끝에서부터 가져온 요소들을 포함하는 새로운 배열이에요.

## 예시

```typescript
// [3, 2, 1]
takeRightWhile([5, 4, 3, 2, 1], n => n < 4);

// []
takeRightWhile([1, 2, 3], n => n > 3);
```
