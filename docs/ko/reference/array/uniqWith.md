# uniqWith

두 요소가 일치하는지 여부를 판단하는 커스텀 함수를 기준으로, 배열 내 요소들의 중복을 제거해요.

## 인터페이스

```typescript
function uniqWith<T>(arr: T[], areItemsEqual: (item1: T, item2: T) => boolean): T[]
```

### 파라미터

- `arr` (`T[]`): 중복을 제거할 배열.
- `areItemsEqual` (`(x: T, y: T) => boolean`): 두 요소가 일치하는지 판단하는 일치 함수예요. 두 요소가 일치한다면 `true`를, 일치하지 않는다면 `false`를 반환하게 해주세요.

### 반환 값

(`T[]`): 커스텀 일치 함수의 반환 값을 기준으로, 중복이 제거된 새로운 배열.

## 예시

```typescript
uniqWith([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], (a, b) => Math.abs(a - b) < 1);
// [1.2, 3.2, 5.7, 7.19]
```
