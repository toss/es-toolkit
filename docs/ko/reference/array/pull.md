# pull

지정된 모든 값을 배열에서 제거합니다.

이 함수는 `arr`를 변경해요.
원본 배열을 수정하지 않고 값을 제거하려면 [difference](./difference.md)를 사용하세요.

## 인터페이스

```typescript
function pull<T, U extends T>(arr: T[], valuesToRemove: readonly U[]): T[];
```

### 파라미터

- `arr` (`T[]`): 수정할 배열.
- `valuesToRemove` (`U[]`): 배열에서 제거할 값들.

### 반환 값

(`T[]`): 지정된 값이 제거된 수정된 배열.

## 예시

```typescript
const numbers = [1, 2, 3, 4, 5, 2, 4];
pull(numbers, [2, 4]);
console.log(numbers); // [1, 3, 5]
```
