# remove

주어진 조건 함수에 따라 배열에서 요소를 제거해요.

이 함수는 `arr`을 직접 변경해요.
원본 배열을 수정하지 않고 요소를 제거하려면 [Array.prototype.filter](https://developer.mozilla.org/ko-KR/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)를 사용하세요.

## 인터페이스

```typescript
function remove<T>(arr: T[], shouldRemoveElement: (value: T, index: number, array: T[]) => boolean): T[];
```

### 파라미터

- `arr` (`T[]`): 수정할 배열.
- `shouldRemoveElement` (`(value: T, index: number, array: T[]) => boolean`): 요소를 제거할지 결정하기 위해 각 반복마다 호출되는 함수.

### 반환 값

(`T[]`): 지정된 요소가 제거된 수정된 배열.

## 예시

```typescript
const numbers = [1, 2, 3, 4, 5];
remove(numbers, value => value % 2 === 0);
console.log(numbers); // [1, 3, 5]
```
