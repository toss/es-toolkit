# shuffle

Fisher-Yates 알고리즘을 사용해서 배열의 요소 순서를 무작위로 섞어요.

이 함수는 배열을 받아서 그 요소들이 무작위로 섞인 새로운 배열을 반환해요.

## 인터페이스

```typescript
function shuffle<T>(arr: T[]): T[];
```

### Parameters 

- `arr` (`T[]`): 요소를 뒤섞을 배열이에요.

### Returns

(`T[]`): 요소들이 무작위로 섞인 새로운 배열이에요.

## Examples

```typescript
const array = [1, 2, 3, 4, 5];
const shuffledArray = shuffle(array);
// shuffledArray는 배열의 요소들이 무작위로 섞인 새로운 배열이 될 거예요, 예: [3, 1, 4, 5, 2]
```