# take

입력 배열 `arr`에서 처음 `count`개의 요소를 포함하는 새로운 배열을 반환해요.

만약 `count`가 `arr`의 길이보다 크면, 전체 배열을 반환해요.

## 인터페이스

```typescript
function take<T>(arr: T[], count: number): T[];
```

### 파라미터

- `arr` (`T[]`): 요소를 가져올 배열이에요.
- `count` (`number`): 가져올 요소의 개수예요.

### 반환 값

(`T[]`): `arr`에서 처음 `count`개의 요소를 포함하는 새로운 배열이에요.

## 예시

```typescript
// [1, 2, 3]
take([1, 2, 3, 4, 5], 3);

// ['a', 'b']
take(['a', 'b', 'c'], 2);

// [1, 2, 3]
take([1, 2, 3], 5);
```
