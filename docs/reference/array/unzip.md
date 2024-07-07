# unzip

Gathers elements in the same position in an internal array from a grouped array of elements and returns them as a new array.

## 인터페이스

```typescript
type Unzip<K extends unknown[]> = { [I in keyof K]: Array<K[I]> };
function unzip<T extends unknown[]>(zipped: Array<[...T]>): Unzip<T>;
```

### 파라미터

- `zipped` (`Array<[...T]>`): An array of grouped elements.

### 반환 값

(`Unzip<T>`): An new array created by collecting elements at the same position in an internal array.

## 예시

```typescript
unzip([
  ['a', true, 1],
  ['b', false, 2],
]);
// return: [['a', 'b'], [true, false], [1, 2]]
```
