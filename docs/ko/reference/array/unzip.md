# unzip

2차원 배열을 인자로 받아서, 각 배열 안 배열에서 같은 위치에 있는 요소들을 모아 새로운 배열로 반환해요.

## 인터페이스

```typescript
type Unzip<K extends unknown[]> = { [I in keyof K]: Array<K[I]> };
function unzip<T extends unknown[]>(zipped: Array<[...T]>): Unzip<T>;
```

### 파라미터

- `zipped` (`Array<[...T]>`): 결합된 요소의 배열이에요.

### 반환 값

(`Unzip<T>`): 내부 배열의 같은 위치에 있는 요소들을 모아 만들어진 새로운 배열이에요.

## 예시

```typescript
unzip([
  ['a', true, 1],
  ['b', false, 2],
]);
// 반환 값: [['a', 'b'], [true, false], [1, 2]]
```
