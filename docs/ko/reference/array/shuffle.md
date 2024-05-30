# shuffle

배열의 요소 순서를 무작위로 섞어요. Fisher-Yates 알고리즘을 사용해요.

## 인터페이스

```typescript
function shuffle<T>(arr: T[]): T[];
```

### 파라미터 

- `arr` (`T[]`): 요소를 뒤섞을 배열이에요.

### 반환 값

(`T[]`): 요소들이 무작위로 섞인 새로운 배열이에요.

## 예시

```typescript
const array = [1, 2, 3, 4, 5];
const shuffledArray = shuffle(array);
// shuffledArray는 배열의 요소들이 무작위로 섞인 새로운 배열인 [3, 1, 4, 5, 2]이 되어요.
```